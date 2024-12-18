# AWS S3 Bucket Infrastructure with CDK

This project implements a secure S3 bucket infrastructure using AWS CDK (Cloud Development Kit) with TypeScript. It creates an S3 bucket with proper encryption, access controls, and logging capabilities.

## Project Overview

This CDK application deploys an AWS S3 bucket with enterprise-grade security features including:
- Server-side encryption
- Access logging
- Lifecycle rules
- Intelligent tiering
- KMS encryption
- Public access blocking

## Features

- 🔒 KMS-managed encryption for both bucket and logs
- 📝 Server access logging with separate logging bucket
- 🚫 Complete public access blocking
- ♻️ Lifecycle rules for cost optimization
- 💰 Intelligent tiering configuration
- 🏷️ Automatic resource tagging
- 🔍 AWS Solutions security checks (cdk-nag)
- 🌍 Environment-based deployment configuration

## Prerequisites

- Node.js (v18 or later)
- AWS CLI configured with appropriate credentials
- AWS CDK CLI installed (`npm install -g aws-cdk`)
- TypeScript knowledge
- AWS account with necessary permissions

## Project Setup

1. Clone the repository
```bash
git clone <repository-url>
cd aws-s3
```

2. Install dependencies
```bash
npm install
```

3. Build the project
```bash
npm run build
```

## Environment Configuration

Create a `.env` file based on `.env.example` with your configuration:

```env
APP_NAME=your-app-name
CDK_DEPLOY_REGION=your-region
ENVIRONMENT=development|staging|production
OWNER=your-team
S3_BUCKET_NAME=your-bucket-name
```

Required environment variables:
- `APP_NAME`: Application identifier
- `CDK_DEPLOY_REGION`: AWS region for deployment
- `ENVIRONMENT`: Deployment environment
- `OWNER`: Team/Owner identifier
- `S3_BUCKET_NAME`: Base name for S3 bucket

## Deployment

1. Bootstrap CDK (first time only)
```bash
npx cdk bootstrap
```

2. Review the changes
```bash
npx cdk diff
```

3. Deploy the stack
```bash
npx cdk deploy
```

## Useful Commands

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and compile
- `npm run test` - Run the jest unit tests
- `npx cdk deploy` - Deploy this stack to AWS
- `npx cdk diff` - Compare deployed stack with current state
- `npx cdk synth` - Emit synthesized CloudFormation template

## Security Considerations

- All buckets are encrypted using KMS keys
- Public access is completely blocked
- SSL is enforced for all requests
- Server access logging is enabled
- Resource policies follow AWS best practices
- AWS Solutions security checks are implemented

## Outputs

The stack exports the following values:
- S3 Bucket Name
- S3 Bucket ARN
- KMS Key ARN
- KMS Key ID

These can be referenced in other stacks or applications using CloudFormation exports.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
