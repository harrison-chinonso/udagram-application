import AWS = require('aws-sdk');
import { config } from './config';

const c = config.dev;

//Configure AWS
if(c.aws_profile !== "DEPLOYED") {
    var credentials = new AWS.SharedIniFileCredentials({profile: c.aws_profile});
    AWS.config.credentials = credentials;
}

export const s3 = new AWS.S3({
    signatureVersion: 'v4',
    region: c.aws_region
});


/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getGetSignedUrl( key: string ): string{

    const signedUrlExpireSeconds = 60 * 5

    const url = s3.getSignedUrl('getObject', {
        Key: key,
        Expires: signedUrlExpireSeconds
    });

    return url;
}