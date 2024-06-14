import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand, DeleteObjectCommand, DeleteObjectCommandOutput } from "@aws-sdk/client-s3";

const BucketName = "ui.jobjenius.com";

export async function putObjectURL(name: string, format: string): Promise<string> {
    const client = new S3Client({
        credentials: {
            accessKeyId: "",
            secretAccessKey: "",
        },
    });
    const command = new PutObjectCommand({
        Bucket: BucketName,
        Key: name,
        ContentType: format,
    });

    return await getSignedUrl(client, command, { expiresIn: 120 });
}

export async function deleteObject(name: string): Promise<DeleteObjectCommandOutput> {
    const client = new S3Client();
    const input = {
        Bucket: BucketName,
        Key: name,
    };

    const command = new DeleteObjectCommand(input);
    const response = await client.send(command);

    return response;
}
