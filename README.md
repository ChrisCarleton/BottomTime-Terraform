# Bottom Time Terraform Files for AWS
The Terraform files necessary for deploying the Bottom Time application to AWS.

Build: [![CircleCI](https://circleci.com/gh/ChrisCarleton/BottomTime-Terraform/tree/master.svg?style=svg&circle-token=4aedf9da000687731e1405d3e4eb074ed9ecaae9)](https://circleci.com/gh/ChrisCarleton/BottomTime-Terraform/tree/master)

## Directory Structure
The Terraform files are kept in the `terraform/` directory. Beneath that the `.tf` files can be found in `modules/` and environment-specific `.tfvars` files can be found in `env/`.

The state is kept in AWS S3 using the appropriate Terraform backend and remote state provider.

## Lambdas
The `lambda/` directory contains the Lambda functions that will be pushed to AWS Lambda. The `tests/`
directory contains the tests for those Lambda functions.
