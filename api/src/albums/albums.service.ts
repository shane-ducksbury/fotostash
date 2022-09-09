import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { Image } from 'src/images/entities/image.entity';
import { AddImageToAlbumDto } from './dto/add-image-to-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album) private albumsRepository: Repository<Album>,
    @InjectRepository(Image) private imagesRepository: Repository<Image>
  ){}


  create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbumUUID = uuidv4();
    const newAlbum = this.albumsRepository.create({id: newAlbumUUID, name: createAlbumDto.name})
    
    return this.albumsRepository.save(newAlbum);
  }

  findAll(): Promise<Album[]> {
    return this.albumsRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    const album: Album = await this.albumsRepository.findOne({
      relations: {
        images: true
      },
      where: {
        id: id
      }
    });

    if(!album) throw new NotFoundException("Album does not exist.");

    return album;
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }

  async addImageToAlbum(albumId: string, addImageToAlbumDto: AddImageToAlbumDto): Promise<Album> {
    const album: Album = await this.findOne(albumId);
    
    const imageId = addImageToAlbumDto.imageId;
    const imageToAdd: Image = await this.imagesRepository.findOne({
      where: {
        id: imageId
      }
    })

    if (!imageToAdd) throw new NotFoundException("Image does not exist.");
    
    album.images.push(imageToAdd);
    // Bug here, can return duplicates. Either should return something else, or
    // do a query after the save has happened.
    return await this.albumsRepository.save(album)
  }
}
