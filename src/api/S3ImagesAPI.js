var AWS = require('aws-sdk');

AWS.config.update(
  {
    accessKeyId: 'XX',
    secretAccessKey: 'XX/',
    region: 'us-east-2',
  }
);

var s3 = new AWS.S3();

export default {
  s3: s3,
}
