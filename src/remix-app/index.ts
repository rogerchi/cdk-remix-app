import * as path from 'path';
import { CfnOutput } from 'aws-cdk-lib';
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager';
import {
  IUserPool,
  OAuthScope,
  UserPoolClient,
  UserPoolClientIdentityProvider,
} from 'aws-cdk-lib/aws-cognito';
import {
  AttributeType,
  BillingMode,
  Table,
  TableEncryption,
} from 'aws-cdk-lib/aws-dynamodb';
import { Function as CdkFunction } from 'aws-cdk-lib/aws-lambda';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

import { Api } from './api';
import { CDN } from './cdn';

export interface RemixCustomDomainProps {
  readonly certificate: ICertificate;
  readonly domainName: string;
}

export interface RemixCognitoAuthProps {
  readonly authDomain: string;
  readonly userPool: IUserPool;
}

export interface RemixAppProps {
  readonly customDomain?: RemixCustomDomainProps;
  readonly remixPath: string;
  readonly cognitoAuth?: RemixCognitoAuthProps;
  readonly ddbSessions?: boolean;
  readonly isDev?: boolean;
}

export class RemixApp extends Construct {
  public readonly handler: CdkFunction;
  public readonly cdnDomainName: string;
  public readonly cdnDistributionId: string;
  constructor(
    scope: Construct,
    id: string,
    {
      ddbSessions,
      customDomain,
      remixPath,
      cognitoAuth,
      isDev = true,
    }: RemixAppProps,
  ) {
    super(scope, id);

    let domainName, certificate;

    const remixPublicPath = path.join(remixPath, '/public');
    const remixServerPath = path.join(remixPath, '/server/index.ts');

    const api = new Api(this, 'api', { remixServerPath });
    this.handler = api.handler;

    if (ddbSessions) {
      const sessionsTable = new Table(this, 'sessionsTable', {
        partitionKey: { name: 'pk', type: AttributeType.STRING },
        billingMode: BillingMode.PAY_PER_REQUEST,
        timeToLiveAttribute: 'ttl',
        encryption: TableEncryption.AWS_MANAGED,
      });

      const cookieSecret = new Secret(this, 'cookieSecret', {
        generateSecretString: {
          excludeUppercase: true,
          excludePunctuation: true,
        },
      });

      sessionsTable.grantReadWriteData(api.handler);
      api.handler.addEnvironment('SESSIONS_TABLE', sessionsTable.tableName);
      api.handler.addEnvironment(
        'COOKIE_SECRET',
        cookieSecret.secretValue.toString() ?? '',
      );
      new CfnOutput(this, 'sessions-table', {
        value: sessionsTable.tableName,
      });
    }

    if (customDomain) {
      domainName = customDomain.domainName;
      certificate = customDomain.certificate;
    }

    const cdn = new CDN(this, 'cdn', {
      certificate,
      domainName,
      httpApi: api.httpApi,
      remixPublicPath,
    });

    this.cdnDomainName = cdn.distribution.distributionDomainName;
    this.cdnDistributionId = cdn.distribution.distributionId;

    const publicDomainName = domainName ?? cdn.distribution.domainName;
    api.handler.addEnvironment('COOKIE_DOMAIN', publicDomainName);
    api.handler.addEnvironment('HOST_URI', `https://${publicDomainName}`);

    if (cognitoAuth) {
      const callbackUrls = [`https://${publicDomainName}/auth/callback`];
      const logoutUrls = [`https://${publicDomainName}/logout`];
      if (isDev) {
        callbackUrls.push('http://localhost:3000/auth/callback');
        logoutUrls.push('http://localhost:3000/logout');
      }

      const { userPool, authDomain } = cognitoAuth;
      const userPoolClient = new UserPoolClient(this, 'userPoolClient', {
        userPool,
        supportedIdentityProviders: [
          UserPoolClientIdentityProvider.COGNITO,
          UserPoolClientIdentityProvider.GOOGLE,
        ],
        oAuth: {
          scopes: [
            OAuthScope.EMAIL,
            OAuthScope.OPENID,
            OAuthScope.PROFILE,
            OAuthScope.COGNITO_ADMIN,
          ],
          flows: { authorizationCodeGrant: true },
          callbackUrls,
          logoutUrls,
        },
        preventUserExistenceErrors: true,
      });

      api.handler.addEnvironment('AUTH_DOMAIN', authDomain);
      api.handler.addEnvironment('CLIENT_ID', userPoolClient.userPoolClientId);
    }

    new CfnOutput(this, 'apiUrl', { value: api.httpApi.url || '' });
    new CfnOutput(this, 'publicDomainName', {
      value: publicDomainName,
    });
    new CfnOutput(this, 'cdnDomainName', {
      value: this.cdnDomainName,
    });
    new CfnOutput(this, 'cdnDistributionId', {
      value: this.cdnDistributionId,
    });
  }
}
