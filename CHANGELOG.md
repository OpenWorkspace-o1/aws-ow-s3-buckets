## [2025-03-10][PR#25](https://github.com/OpenWorkspace-o1/aws-ow-s3-buckets/pull/25)

### Fixed
- Fixed `serverAccessLogsBucket` naming rule to include `resourcePrefix`.

### Updated
- Updated `cdk-nag` from `2.35.40` to `2.35.41`.
- Bumped package version from `0.1.4` to `0.1.5`.

## [2025-03-09][PR#23](https://github.com/OpenWorkspace-o1/aws-s3-buckets/pull/23)

### Updated
- Updated `aws-cdk` from `2.1001.0` to `2.1003.0` and `aws-cdk-lib` from `2.181.1` to `2.182.0`.
- Updated `cdk-nag` from `2.35.34` to `2.35.40`.
- Updated `@types/node` from `22.13.7` to `22.13.10`.
- Bumped project version from `0.1.3` to `0.1.4`.

## [2025-03-01][PR#20](https://github.com/OpenWorkspace-o1/aws-s3-buckets/pull/20)

### Fixed
- Fixed multiple S3 bucket deployment issue by dynamically constructing bucket names using `resourcePrefix` and exporting deployment bucket names using `CfnOutput`.

### Updated
- Updated `aws-cdk` to `2.1001.0`, `aws-cdk-lib` to `2.181.1`, and `cdk-nag` to `2.35.34`.
- Updated `@types/node` to `22.13.7` and `typescript` to `~5.8.2`.
- Increased KMS key rotation period from `30` to `90` days.

## [2025-01-11] [PR#18](https://github.com/OpenWorkspace-o1/aws-s3-buckets/pull/18)

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
