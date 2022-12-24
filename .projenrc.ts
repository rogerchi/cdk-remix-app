import { awscdk } from 'projen';

const cdkVersion = '2.24.0';
const name = 'cdk-remix-app';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Roger Chi',
  authorAddress: 'roger@rogerchi.com',
  cdkVersion,
  defaultReleaseBranch: 'main',
  name,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/rogerchi/cdk-remix-app.git',

  peerDeps: [
    `@aws-cdk/aws-apigatewayv2-alpha@${cdkVersion}-alpha.0`,
    `@aws-cdk/aws-apigatewayv2-integrations-alpha@${cdkVersion}-alpha.0`,
  ],

  devDeps: ['esbuild'],
  publishToPypi: {
    distName: name,
    module: 'cdk_remix-app',
  },
  releaseToNpm: true,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

project.synth();
