import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AwsS3StackProps } from './AwsS3StackProps';
import * as kms from 'aws-cdk-lib/aws-kms';
import { AwsS3BucketsNestedStack } from './constructs/aws-s3-buckets-nested-stack';

export class AwsS3Stack extends cdk.Stack {
  /**
   * Constructs a new instance of the AwsS3Stack.
   *
   * @param scope The parent construct.
   * @param id An identifier for the stack.
   * @param props Configuration properties for the stack, including resource prefixes, bucket names, and deployment environment.
   */
  constructor(scope: Construct, id: string, props: AwsS3StackProps) {
    super(scope, id, props);

    const removalPolicy = props.deployEnvironment === 'production' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY;

    const kmsKey = new kms.Key(this, `${props.resourcePrefix}-s3-buckets-kms-key`, {
      enableKeyRotation: true,
      removalPolicy: removalPolicy,
      description: `${props.resourcePrefix}-s3-buckets-kms-key`,
    });

    for (const s3BucketName of props.s3BucketNames) {
      new AwsS3BucketsNestedStack(this, `${s3BucketName}-AwsS3BucketsNestedStack`, {
        ...props,
        s3BucketName,
        kmsKeyArn: kmsKey.keyArn,
        removalPolicy: removalPolicy,
        description: `${props.resourcePrefix}-${s3BucketName}-AwsS3BucketsNestedStack`,
      });
    }

    // export kmsKey ARN
    new cdk.CfnOutput(this, `${props.resourcePrefix}-s3-buckets-kms-key-Arn-Export`, {
      value: kmsKey.keyArn,
      exportName: `${props.deployEnvironment}-${props.deployRegion}-s3-buckets-kms-key-Arn-Export`,
      description: 'The ARN of the KMS key.',
    });

    // export kmsKey ID
    new cdk.CfnOutput(this, `${props.resourcePrefix}-s3-buckets-kms-key-Id-Export`, {
      value: kmsKey.keyId,
      exportName: `${props.deployEnvironment}-${props.deployRegion}-s3-buckets-kms-key-Id-Export`,
      description: 'The ID of the KMS key.',
    });
  }
}
