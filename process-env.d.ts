declare module NodeJS {
    interface ProcessEnv {
        [key: string]: string | undefined;
        CDK_DEPLOY_REGION: string;
        ENVIRONMENT: string;
        APP_NAME: string;
        OWNER: string;
        S3_BUCKET_NAMES: string;
        S3_BUCKET_ENABLE_EVENT_BRIDGES: string;
    }
}
