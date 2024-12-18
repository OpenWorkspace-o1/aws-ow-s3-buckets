import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AwsS3StackProps } from './AwsS3StackProps';

export class AwsS3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AwsS3StackProps) {
    super(scope, id, props);
  }
}
