import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { Image } from 'src/images/entities/image.entity';
import { AddImageToAlbumDto } from './dto/add-image-to-album.dto';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album) private albumsRepository: Repository<Album>,
    @InjectRepository(Image) private imagesRepository: Repository<Image>,
    private readonly imagesService: ImagesService
  ){}


  create(createAlbumDto: CreateAlbumDto, userId: string): Promise<Album> {
    const newAlbumUUID = uuidv4();
    const newAlbum = this.albumsRepository.create({
      id: newAlbumUUID,
      name: createAlbumDto.name,
      albumOwnerId: userId
    })
    
    return this.albumsRepository.save(newAlbum);
  }

  findAll(userId: string): Promise<Album[]> {
    return this.albumsRepository
    .createQueryBuilder('album')
    .where('albumOwnerId = :id', { id: userId })
    .getMany()
  }

  async findOne(albumId: string, userId: string): Promise<Album> {
    const album: Album = 
    await this.albumsRepository
    .createQueryBuilder('album')
    .where('album.id = :albumId AND album.albumOwnerId = :userId', {albumId: albumId, userId: userId})
    .leftJoinAndSelect('album.images', 'images')
    .getOne()

    if(!album) throw new NotFoundException("Album does not exist.");

    return album;
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }

  async addImageToAlbum(albumId: string, addImageToAlbumDto: AddImageToAlbumDto, userId: string): Promise<Album> {
    const album: Album = await this.findOne(albumId, userId);
    
    const imageId = addImageToAlbumDto.imageId;
    const imageToAdd: Image = await this.imagesService.getById(imageId, userId);

    if (!imageToAdd) throw new NotFoundException("Image does not exist.");
    
    album.images.push(imageToAdd);
    // Bug here, can return duplicates. Either should return something else, or
    // do a query after the save has happened.
    return await this.albumsRepository.save(album)
  }
}
