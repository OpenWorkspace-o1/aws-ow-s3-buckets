#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';
import { checkEnvVariables, getShortEnvironmentName } from '../utils/check-environment-variable';

import { ApplyTags } from '../utils/apply-tag';
import { Aspects } from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';
import { AwsS3Stack } from '../lib/aws-s3-stack';
import { AwsS3StackProps } from '../lib/AwsS3StackProps';

dotenv.config(); // Load environment variables from .env file
const app = new cdk.App();

const appAspects = Aspects.of(app);

// check APP_NAME variable
checkEnvVariables('APP_NAME',
    'CDK_DEPLOY_REGION',
    'ENVIRONMENT',
    'OWNER',
    'S3_BUCKET_NAME',
);

const { CDK_DEFAULT_ACCOUNT: account } = process.env;

const cdkRegion = process.env.CDK_DEPLOY_REGION;
const deployEnvironment = process.env.ENVIRONMENT!;
const shortDeployEnvironment = getShortEnvironmentName(deployEnvironment);
const appName = process.env.APP_NAME!;
const owner = process.env.OWNER!;

// check best practices based on AWS Solutions Security Matrix
appAspects.add(new AwsSolutionsChecks());

appAspects.add(new ApplyTags({
    environment: deployEnvironment as 'development' | 'staging' | 'production' | 'feature',
    project: appName,
    owner: owner,
}));

const stackProps: AwsS3StackProps = {
    resourcePrefix: `${appName}-${shortDeployEnvironment}`,
    env: {
        region: cdkRegion,
        account,
    },
    deployRegion: cdkRegion,
    deployEnvironment,
    shortDeployEnvironment,
    appName,
    owner,
    s3BucketName: process.env.S3_BUCKET_NAME!,
};
new AwsS3Stack(app, `AwsS3Stack`, {
    ...stackProps,
    stackName: `${appName}-${deployEnvironment}-${cdkRegion}-AwsS3Stack`,
    description: `AwsS3Stack for ${appName} in ${cdkRegion} ${deployEnvironment}.`,
});

app.synth();
