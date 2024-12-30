import { NestedStackProps } from "aws-cdk-lib";
import * as cdk from 'aws-cdk-lib';
import { AwsS3BaseStackProps } from "../AwsS3StackProps";

export interface AwsS3BucketsNestedStackProps extends NestedStackProps, AwsS3BaseStackProps {
    readonly s3BucketName: string;
    readonly kmsKeyArn: string;
    readonly removalPolicy: cdk.RemovalPolicy;
}
