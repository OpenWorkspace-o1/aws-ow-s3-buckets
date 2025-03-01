## [2025-03-01][PR#OpenWorkspace-o1/aws-s3-buckets/20](https://github.com/OpenWorkspace-o1/aws-s3-buckets/pull/20)

### Fixed
- Fixed multiple S3 bucket deployment issue by dynamically constructing bucket names using `resourcePrefix` and exporting deployment bucket names using `CfnOutput`.

### Updated
- Updated `aws-cdk` to `2.1001.0`, `aws-cdk-lib` to `2.181.1`, and `cdk-nag` to `2.35.34`.
- Updated `@types/node` to `22.13.7` and `typescript` to `~5.8.2`.
- Increased KMS key rotation period from `30` to `90` days.

## [2025-01-11][https://github.com/OpenWorkspace-o1/aws-s3-buckets/pull/18]

### Updated
- Updated `aws-cdk` and `aws-cdk-lib` dependencies from `2.174.1` to `2.175.1`
- Updated `typescript` dependency from `~5.7.2` to `~5.7.3`
- Incremented package version from `0.1.2` to `0.1.3`

## [2025-01-07][https://github.com/OpenWorkspace-o1/aws-s3-buckets/pull/16]

### Updated
- Updated `aws-cdk` and `aws-cdk-lib` dependencies to version `2.174.1`
- Updated `@types/node` dependency from `22.10.2` to `22.10.5`
- Incremented package version from `0.1.1` to `0.1.2`

### Added

- Added `cdk` script to the `scripts` section in `package.json`
