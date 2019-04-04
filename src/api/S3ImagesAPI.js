var AWS = require('aws-sdk');

AWS.config.update(
  {
    accessKeyId: process.env.REACT_APP_AWSAccessKeyId,
    secretAccessKey: process.env.REACT_APP_AWSSecretKey,
    region: 'us-east-2',
  }
);

var s3 = new AWS.S3();

export default {
  s3: s3,
}
