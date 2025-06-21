import { StackProps } from "aws-cdk-lib";

export interface AwsS3StackProps extends StackProps, AwsS3BaseStackProps {
    /**
     * Name of the S3 buckets
     * Example: ["myapp-prod-bucket", "myapp-dev-bucket"]
     */
    readonly s3BucketNames: string[];

    /**
     * EventBridge enabled
     * Example: [true, false]
     */
    readonly eventBridgeEnableds: boolean[];
}

export interface AwsS3BaseStackProps {
    /**
     * Prefix used for naming AWS resources
     * Example: "myapp-prod"
     */
    readonly resourcePrefix: string;

    /**
     * AWS region where resources will be deployed
     * Example: "us-east-1"
     */
    readonly deployRegion: string | undefined;

    /**
     * Full environment name where the stack is being deployed
     * Example: "production"
     */
    readonly deployEnvironment: string;

    /**
     * Shortened version of the environment name
     * Example: "prd", "dev",...
     */
    readonly shortDeployEnvironment: string;

    /**
     * Name of the application
     * Example: "myapp"
     */
    readonly appName: string;

    /**
     * Owner or team responsible for the resources
     * Example: "platform-team"
     */
    readonly owner: string;
}
