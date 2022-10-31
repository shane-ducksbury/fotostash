import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './file.model';

@Injectable()
export class MinioClientService {
    constructor(private minioService: MinioService){}

    private bucketName = process.env.MINIO_BUCKET_NAME;

    public get client() {
        return this.minioService.client;
    }

    public async upload(file: BufferedFile, imageUuid: string, bucketName: string = this.bucketName): Promise<string> {
        if(!(file.mimetype.includes('jpeg')) || file.mimetype.includes('png')) {
            throw new HttpException('File type not supported', HttpStatus.BAD_REQUEST);
        }
        
        const extension = file.originalname.substring(
            file.originalname.lastIndexOf('.'),
            file.originalname.length,
        );
        const fileName = imageUuid + extension;

        const metaData = {
            'Content-Type': file.mimetype,
        };
        

        try{
          this.client.putObject(
              bucketName,
              fileName,
              file.buffer,
              metaData,
              function (err, res) {
                if (err) {
                  console.log(err)
                  // throw new HttpException(
                  //   'Error uploading file',
                  //   HttpStatus.BAD_REQUEST,
                  // );
                }
              },
            );
            return `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${fileName}`;
        } catch (err){
          console.log(err)
        }
        
    }

}
