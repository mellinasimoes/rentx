import { IStorageProvider } from "../IstorageProvider";
import { S3 } from "aws-sdk";
import { resolve } from "path";
import fs from "fs";     //leitura do arquivo
import mime from "mime"; // permite obter o ContentType do arquivo
import upload from "@config/upload";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor () {
    console.log(process.env.AWS_BUCKET_REGION);
    
    this.client =  new S3 ({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {

    console.log("chamou s3 provider");
    
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType,  //Quando o usuário clicar na url não faz dowload automático da imagem e permite a visualização dentro da página
      })
      .promise();

      await fs.promises.unlink(originalName);
      
    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}  

export { S3StorageProvider }