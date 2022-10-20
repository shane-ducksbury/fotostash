import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';

import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImageProcessorService } from 'src/image-processor/image-processor.service';
import { ImageInfo } from './entities/image-info.entity';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(Image) private imagesRepository: Repository<Image>,
        @InjectRepository(ImageInfo) private imageInfoRepository: Repository<ImageInfo>,
        private minioService: MinioClientService,
        private imageProcessorModule: ImageProcessorService
    ){}

    getAll(userId: string): Promise<Image[]> {
        return this.imagesRepository
        .createQueryBuilder('image')
        .where('imageOwnerId = :id AND deleted = false', { id: userId })
        .getMany()
    }

    async getById(imageId: string, userId: string): Promise<Image> {
        const image = 
        await this.imagesRepository
            .createQueryBuilder('image')
            .where('id = :imageId and imageOwnerId = :userId', {imageId: imageId, userId: userId})
            .getOne()

        if (!image)throw new NotFoundException();

        return image;
    }

    async getByHash(hash: string, userId: string): Promise<Image> {
        const image = 
        await this.imagesRepository
            .createQueryBuilder('image')
            .where('md5Hash = :hash and imageOwnerId = :userId', {hash: hash, userId: userId})
            .getOne();

        if (!image) return null;

        return image;
    }

    getTrash(userId: string): Promise<Image[]> {
        return this.imagesRepository
        .createQueryBuilder('image')
        .where('deleted = true and imageOwnerId = :userId', {userId: userId})
        .getMany()
    }

    createImage(createUserDto: CreateImageDto): any {
        // Example uses spread like below
        const newImage = {id: Date.now(), ...createUserDto};
        return;
    }

    async updateImage(imageId: string, updateImageDto: UpdateImageDto, userId: string): Promise<Image> {
        const image: Image = await this.getById(imageId, userId);

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

    async emptyTrash(userId: string): Promise<HttpStatus.NO_CONTENT> {
        const trashedImages = await this.getTrash(userId);
        if (trashedImages) trashedImages.forEach(image => this.deleteImage(image.id))
        return HttpStatus.NO_CONTENT
    }

    async uploadImage(file: BufferedFile, fileBuffer: Buffer, userId: string): Promise<Image> {
        const newImageUUID = uuidv4();
        const hashSum = createHash('md5');
        hashSum.update(fileBuffer);
        const fileHash = hashSum.digest('hex');

        const preExistingImage = await this.getByHash(fileHash, userId);
        if(preExistingImage) return preExistingImage;

        const fileUrl = await this.minioService.upload(file, newImageUUID);
        const tags = await this.imageProcessorModule.getImageTags(fileBuffer);
        try{
            const newImageInfo = await this.imageInfoRepository.create({
                infoId: uuidv4(),
                imageId: newImageUUID,
                dateTime: tags.exif ? tags.exif.DateTime.description : '2022:01:01 0:0:01',
                // dateTime: tags.exif.DateTime.description, // Use this to cause an upload error for testing
                imageWidth: tags.file['Image Width'].value,
                imageHeight: tags.file['Image Height'].value
            })
            await this.imageInfoRepository.save(newImageInfo);
            const newImage = this.imagesRepository.create({
                id: newImageUUID,
                name: file.originalname,
                imageUrl: "http://" + fileUrl,
                dateTime: newImageInfo.dateTime,
                deleted: false,
                imageOwnerId: userId,
                imageInfo: newImageInfo.infoId,
                md5Hash: fileHash
            });
            return this.imagesRepository.save(newImage);
        } catch(e){
            throw new HttpException('The upload failed due to an issue with the database', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return null
    }
}
