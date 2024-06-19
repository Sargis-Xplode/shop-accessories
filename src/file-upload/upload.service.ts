import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { v4 } from "uuid";

require("dotenv").config();

@Injectable()
export class UploadService {
    AWS_S3_BUCKET = "assets.hifind.am";
    s3 = new AWS.S3({
        accessKeyId: process.env.AMAZON_CLIENT_ID,
        secretAccessKey: process.env.AMAZON_ACCESS_KEY,
        region: "us-east-1",
    });

    async uploadFile(file: Express.Multer.File) {
        const uniqueName = v4();
        console.log(process.env.AMAZON_CLIENT_ID);
        console.log(process.env.AMAZON_ACCESS_KEY);

        return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET, uniqueName, file.originalname, file.mimetype);
    }

    async s3_upload(file: any, bucket: string, name: any, fullName: string, mimetype: any) {
        const params = {
            Bucket: bucket,
            Key: `shop/${String(name)}.${fullName.split(".")[1]}`,
            Body: file,
            ContentType: mimetype,
        };

        try {
            let s3Response = await this.s3.upload(params).promise();
            return s3Response;
        } catch (e) {
            console.log(e);
        }
    }
}
