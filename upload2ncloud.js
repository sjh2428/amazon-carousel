const dotenv = require("dotenv");
dotenv.config();

const AWS = require('aws-sdk');
const fs = require('fs');
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const access_key = process.env.ACCESS_KEY;
const secret_key = process.env.SECRET_KEY;

AWS.config.update({
    accessKeyId: access_key,
    secretAccessKey: secret_key
});

const S3 = new AWS.S3({
    endpoint,
    region
});

const options = {
    partSize: 5 * 1024 * 1024
};

/**
 * upload file within 5mb to ncloud with relative path
 * 
 * @param {String} local_file_name must input with Relative path
 */
const upload2ncloud = async (local_file_name) => {
    await S3.upload({
        Bucket: process.env.BUCKET_NAME,
        Key: local_file_name,
        ACL: "public-read",
        Body: fs.createReadStream(local_file_name)
    }, options).promise();
}

module.exports = upload2ncloud;