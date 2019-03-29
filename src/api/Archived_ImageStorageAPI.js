//USES LIRBARY aws-S3 which is identitcal to AWS-SDK

import S3 from 'aws-s3';

const config = {
  bucketName: 'guess-who-images',
  region: 'us-east-2',
  // accessKeyId: 'XXX',
  // secretAccessKey: 'XXX/',
  // bucketName: process.env.bucket,
    // accessKeyId: process.env.AWSAccessKeyId,
    // secretAccessKey: process.env.AWSSecretKey,
    // s3Url: 'https://my-s3-url.com/', /* optional */
}

const S3Client = new S3(config);

  export default {
    S3Client: S3Client,
  }