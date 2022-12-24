import { HttpApi } from '@aws-cdk/aws-apigatewayv2-alpha';
import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager';
import {
  AllowedMethods,
  CacheCookieBehavior,
  CachePolicy,
  CacheQueryStringBehavior,
  Distribution,
  OriginRequestCookieBehavior,
  OriginRequestHeaderBehavior,
  OriginRequestPolicy,
  OriginRequestQueryStringBehavior,
  ResponseHeadersPolicy,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import { HttpOrigin, S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
  BucketEncryption,
} from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

interface CdnProps {
  certificate?: ICertificate;
  domainName?: string;
  httpApi: HttpApi;
  remixPublicPath: string;
}

export class CDN extends Construct {
  public distribution: Distribution;

  constructor(
    scope: Construct,
    id: string,
    { domainName, certificate, remixPublicPath, httpApi }: CdnProps,
  ) {
    super(scope, id);

    const domainNames = domainName ? [domainName] : undefined;

    const httpApiHost = (httpApi.url || '').split('/')[2];

    const staticBucket = new Bucket(this, 'static', {
      accessControl: BucketAccessControl.PRIVATE,
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      publicReadAccess: false,
      versioned: true,
    });

    new BucketDeployment(this, 'staticDeployment', {
      sources: [Source.asset(remixPublicPath)],
      destinationBucket: staticBucket,
      memoryLimit: 2048,
    });

    const cachePolicy = new CachePolicy(this, 'cachePolicy', {
      cookieBehavior: CacheCookieBehavior.all(),
      defaultTtl: Duration.seconds(0),
      minTtl: Duration.seconds(0),
      maxTtl: Duration.days(10),
      queryStringBehavior: CacheQueryStringBehavior.all(),
      enableAcceptEncodingGzip: true,
      enableAcceptEncodingBrotli: true,
    });

    const remixRequestPolicy = new OriginRequestPolicy(
      this,
      'originRequestPolicy',
      {
        cookieBehavior: OriginRequestCookieBehavior.all(),
        headerBehavior: OriginRequestHeaderBehavior.allowList(
          'Accept',
          'origin',
        ),
        queryStringBehavior: OriginRequestQueryStringBehavior.all(),
      },
    );

    const s3Origin = new S3Origin(staticBucket);

    this.distribution = new Distribution(this, 'distribution', {
      domainNames,
      certificate,
      defaultBehavior: {
        allowedMethods: AllowedMethods.ALLOW_ALL,
        cachePolicy,
        origin: new HttpOrigin(httpApiHost),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        originRequestPolicy: remixRequestPolicy,
        responseHeadersPolicy: ResponseHeadersPolicy.SECURITY_HEADERS,
      },
      additionalBehaviors: {
        '/build/*': {
          origin: s3Origin,
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        'favicon.ico': {
          origin: s3Origin,
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
      },
    });
  }
}
