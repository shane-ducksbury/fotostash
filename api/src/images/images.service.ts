import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';
import { v4 as uuidv4 } from 'uuid';

import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(Image) private imagesRepository: Repository<Image>,
        private minioService: MinioClientService
    ){}

    getAll(): Promise<Image[]> {
        return this.imagesRepository.find();
    }

    findById(imageId: string): any {
        // return this.images.find(image => image.id === imageId);
    }

    createImage(createUserDto: CreateImageDto): any {
        // Example uses spread like below
        const newImage = {id: Date.now(), ...createUserDto};

        // this.images.push(newImage);

        return;
    }

    async uploadImage(file: BufferedFile): Promise<Image> {
        const newImageUUID = uuidv4();

        const fileUrl = await this.minioService.upload(file, newImageUUID);

        console.log(fileUrl)

        const newImage = this.imagesRepository.create({id: newImageUUID, name: file.originalname, imageUrl: fileUrl});

        return this.imagesRepository.save(newImage);
    }
}
