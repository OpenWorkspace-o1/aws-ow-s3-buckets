import { NestedStackProps } from "aws-cdk-lib";
import * as cdk from 'aws-cdk-lib';
import { AwsS3BaseStackProps } from "../AwsS3StackProps";

export interface AwsS3BucketsNestedStackProps extends NestedStackProps, AwsS3BaseStackProps {
    /**
     * Name of the S3 bucket
     * Example: "myapp-prod-bucket"
     */
    readonly s3BucketName: string;

    /**
     * KMS key ARN
     * Example: "arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012"
     */
    readonly kmsKeyArn: string;

    /**
     * Removal policy
     * Example: cdk.RemovalPolicy.DESTROY
     */
    readonly removalPolicy: cdk.RemovalPolicy;
}
