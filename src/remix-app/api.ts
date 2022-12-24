import { HttpApi } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { Duration } from 'aws-cdk-lib';
import {
  Function as CdkFunction,
  Architecture,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export interface ApiProps {
  remixServerPath: string;
}

export class Api extends Construct {
  public handler: CdkFunction;
  public httpApi: HttpApi;
  constructor(scope: Construct, id: string, { remixServerPath }: ApiProps) {
    super(scope, id);

    this.handler = new NodejsFunction(this, 'defaultLambda', {
      entry: remixServerPath,
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        NODE_ENV: 'production',
      },
      architecture: Architecture.ARM_64,
      handler: 'handler',
      memorySize: 2048,
      runtime: Runtime.NODEJS_16_X,
      timeout: Duration.seconds(30),
    });

    const integration = new HttpLambdaIntegration(
      'remixIntegration',
      this.handler,
    );

    this.httpApi = new HttpApi(this, 'api', {
      defaultIntegration: integration,
    });
  }
}
