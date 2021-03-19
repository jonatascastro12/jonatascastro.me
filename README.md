# jonatascastro.me

My personal vCard website.
This respository was forked from @zenorocha. Thanks to Zeno Rocha!

## Quick start
1. Install dependencies: `npm instal`
2. Build the project: `npm run build`
3. Start dev server: `npm start`

## Deploy
This project is ready to deploy at Amazon S3 and Cloufront. 
So, to go live, you should create a bucket at S3 and a distribution at Cloudfront.
You should also create an access key at AWS IAM. Give full permissions to S3 and Cloudfront.

1 . Setup your [credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) for AWS (~/.aws/credentials) 
2 . Setup a .env file on the project folder. AWS_PROFILE should point to your credential profile from the previous step.
```
AWS_PROFILE=default
AWSS3BucketName=XXXXXX
AWSCloudfrontDistributionId=XXXXXX
```
3 . Run `npm run deploy`



