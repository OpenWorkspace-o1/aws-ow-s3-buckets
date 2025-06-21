import { Construct } from "constructs";
import { NestedStack } from "aws-cdk-lib";
import { AwsS3BucketsNestedStackProps } from "./AwsS3BucketsNestedStackProps";
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib';

export class AwsS3BucketsNestedStack extends NestedStack {
  constructor(scope: Construct, id: string, props: AwsS3BucketsNestedStackProps) {
    super(scope, id, props);

    const existingKmsKey = kms.Key.fromKeyArn(this, `${props.resourcePrefix}-${props.s3BucketName}-kms-key`, props.kmsKeyArn);

    // define an S3 bucket
    const s3Bucket = new s3.Bucket(this, `${props.resourcePrefix}-${props.deployRegion}-${props.s3BucketName}`, {
        bucketName: `${props.resourcePrefix}-${props.deployRegion}-${props.s3BucketName}`,
        encryption: s3.BucketEncryption.KMS,
        encryptionKey: existingKmsKey,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        publicReadAccess: false,
        removalPolicy: props.removalPolicy,
        autoDeleteObjects: props.removalPolicy === cdk.RemovalPolicy.DESTROY,
        accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
        versioned: true,
        lifecycleRules: [
            {
                transitions: [
                    {
                        storageClass: s3.StorageClass.INFREQUENT_ACCESS,
                        transitionAfter: cdk.Duration.days(90),
                    },
                    {
                        storageClass: s3.StorageClass.GLACIER,
                        transitionAfter: cdk.Duration.days(180),
                    },
                ],
            },
        ],
        intelligentTieringConfigurations: [
            {
                name: 'optimize-storage-costs',
                archiveAccessTierTime: cdk.Duration.days(90),
                deepArchiveAccessTierTime: cdk.Duration.days(180),
            },
        ],
        serverAccessLogsBucket: new s3.Bucket(this, `${props.resourcePrefix}-${props.deployRegion}-${props.s3BucketName}-logs`, {
            bucketName: `${props.resourcePrefix}-${props.deployRegion}-${props.s3BucketName}-logs`,
            encryption: s3.BucketEncryption.S3_MANAGED,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            publicReadAccess: false,
            removalPolicy: props.removalPolicy,
            versioned: false,
            enforceSSL: true,
        }),
        enforceSSL: true,
        eventBridgeEnabled: props.eventBridgeEnabled,
        serverAccessLogsPrefix: `${props.resourcePrefix}-${props.deployRegion}-${props.s3BucketName}-logs/`
    });

    // export s3Bucket name
    new cdk.CfnOutput(this, `${props.resourcePrefix}-${props.deployRegion}-${props.s3BucketName}-Export`, {
        value: s3Bucket.bucketName,
        exportName: `${props.deployEnvironment}-${props.deployRegion}-${props.s3BucketName}-Export`,
        description: 'The name of the S3 bucket.',
    });

    // export s3Bucket ARN
    new cdk.CfnOutput(this, `${props.resourcePrefix}-${props.deployRegion}-${props.s3BucketName}-Arn-Export`, {
        value: s3Bucket.bucketArn,
        exportName: `${props.deployEnvironment}-${props.deployRegion}-${props.s3BucketName}-Arn-Export`,
        description: 'The ARN of the S3 bucket.',
    });
  }
}
