import { Injectable } from '@nestjs/common';
import ExifReader from 'exifreader';

@Injectable()
export class ImageProcessorService {
    public async getImageTags(image: Buffer): Promise<ExifReader.Tags & ExifReader.XmpTags & ExifReader.IccTags>{
        const tags = await ExifReader.load(image);
        return tags;
    }
}
