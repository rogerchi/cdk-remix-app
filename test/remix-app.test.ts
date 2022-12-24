import * as path from 'path';
import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { RemixApp } from '../src';

let stack: Stack;
let app: App;
beforeEach(() => {
  app = new App();
  stack = new Stack(app, 'test-stack', {
    env: {
      region: 'us-east-1',
      account: 'test-account',
    },
  });
  jest.clearAllMocks();
});

test('Remix App creates sessions table if enabled', () => {
  new RemixApp(stack, 'test', {
    remixPath: path.join(__dirname, 'assets'),
    ddbSessions: true,
  });

  Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
    Environment: {
      Variables: {
        SESSIONS_TABLE: { Ref: 'testsessionsTable04CC07A3' },
      },
    },
  });
});
