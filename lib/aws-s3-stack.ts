import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class AwsS3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  }
}
