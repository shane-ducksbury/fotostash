import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';
import { v4 as uuidv4 } from 'uuid';

import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(Image) private imagesRepository: Repository<Image>,
        private minioService: MinioClientService
    ){}

    getAll(): Promise<Image[]> {
        return this.imagesRepository.find({
            where: {
                deleted: false
            }
        });
    }

    async getById(imageId: string): Promise<Image> {
        const image = await this.imagesRepository.findOne({
            where: {
                id: imageId
                }
        })
            
        if (!image)throw new NotFoundException();

        return image;
    }

    getTrash(): Promise<Image[]> {
        return this.imagesRepository.find({
            where: {
                deleted: true
            }
        })
    }

    createImage(createUserDto: CreateImageDto): any {
        // Example uses spread like below
        const newImage = {id: Date.now(), ...createUserDto};
        return;
    }

    async updateImage(imageId: string, updateImageDto: UpdateImageDto): Promise<Image> {
        const image: Image = await this.getById(imageId);

        if (!image) throw new NotFoundException();
        if (image.name !== updateImageDto.name) image.name = updateImageDto.name;
        if (updateImageDto.deleted && !image.deleted) image.deleted = true;
        if (updateImageDto.deleted !== null && updateImageDto.deleted === false && image.deleted) image.deleted = false;

        // To be implemented - update of albums

        this.imagesRepository.save(image);
        return image;
    }

    async deleteImage(imageId: string): Promise<DeleteResult> {
        return await this.imagesRepository
        .createQueryBuilder()
        .delete()
        .from(Image)
        .where(`id = :id`, {id: imageId})
        .execute()
    }

    async emptyTrash(): Promise<HttpStatus.NO_CONTENT> {
        const trashedImages = await this.getTrash();

        if (trashedImages) trashedImages.forEach(image => this.deleteImage(image.id))

        return HttpStatus.NO_CONTENT
    }

    async uploadImage(file: BufferedFile): Promise<Image> {
        const newImageUUID = uuidv4();
        const fileUrl = await this.minioService.upload(file, newImageUUID);
        const newImage = this.imagesRepository.create({id: newImageUUID, name: file.originalname, imageUrl: "http://" + fileUrl, deleted: false});

        return this.imagesRepository.save(newImage);
    }
}
