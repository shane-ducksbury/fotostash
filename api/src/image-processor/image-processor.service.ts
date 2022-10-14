import { Injectable } from '@nestjs/common';
import ExifReader, { ExpandedTags } from 'exifreader';

@Injectable()
export class ImageProcessorService {
    public async getImageTags(image: Buffer): Promise<ExpandedTags>{
        const tags = await ExifReader.load(image, {expanded: true});
        return tags;
    }
}
