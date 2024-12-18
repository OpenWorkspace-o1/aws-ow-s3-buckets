import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AwsS3StackProps } from './AwsS3StackProps';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as kms from 'aws-cdk-lib/aws-kms';

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

    const kmsKey = new kms.Key(this, `${props.resourcePrefix}-${props.s3BucketName}-kms-key`, {
      enableKeyRotation: true,
      removalPolicy: removalPolicy,
      description: `${props.resourcePrefix}-${props.s3BucketName}-kms-key`,
    });

    // define an S3 bucket
    const s3Bucket = new s3.Bucket(this, `${props.resourcePrefix}-${props.s3BucketName}`, {
      bucketName: `${props.deployEnvironment}-${props.deployRegion}-${props.s3BucketName}`,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      publicReadAccess: false,
      removalPolicy: removalPolicy,
      autoDeleteObjects: removalPolicy === cdk.RemovalPolicy.DESTROY,
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      versioned: true, // Enable versioning
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
      serverAccessLogsBucket: new s3.Bucket(this, `${props.resourcePrefix}-s3-bucket-logs`, {
        bucketName: `${props.deployEnvironment}-${props.deployRegion}-s3-bucket-logs`,
        encryption: s3.BucketEncryption.KMS,
        encryptionKey: kmsKey,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        publicReadAccess: false,
        removalPolicy: removalPolicy,
        versioned: false,
        enforceSSL: true,  // Ensure all requests to the S3 bucket use SSL
      }),
      enforceSSL: true,  // Ensure all requests to the S3 bucket use SSL
      serverAccessLogsPrefix: `${props.resourcePrefix}-${props.deployRegion}-${props.s3BucketName}-logs/`
    });

    // export s3Bucket name
    new cdk.CfnOutput(this, `${props.resourcePrefix}-${props.s3BucketName}-Export`, {
      value: s3Bucket.bucketName,
      exportName: `${props.deployEnvironment}-${props.deployRegion}-${props.s3BucketName}-Export`,
      description: 'The name of the S3 bucket.',
    });

    // export s3Bucket ARN
    new cdk.CfnOutput(this, `${props.resourcePrefix}-${props.s3BucketName}-Arn-Export`, {
      value: s3Bucket.bucketArn,
      exportName: `${props.deployEnvironment}-${props.deployRegion}-${props.s3BucketName}-Arn-Export`,
      description: 'The ARN of the S3 bucket.',
    });
  }
}
