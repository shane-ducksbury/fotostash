import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

  async delete(albumId: string, userId: string) {
    const albumToDelete = await this.findOne(albumId, userId);
    if(!albumToDelete) return new HttpException('Album Does Not Exist or Not Found', HttpStatus.BAD_REQUEST)
    try{
      await this.albumsRepository
      .createQueryBuilder()
      .delete()
      .from(Album)
      .where('id = :id', {id: albumId})
      .execute();
      return `Deleted ${albumId}`
    } catch(e) {
      throw new HttpException('The Delete failed due to an issue with the database', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }

  async addImageToAlbum(albumId: string, addImageToAlbumDto: AddImageToAlbumDto, userId: string): Promise<Album> {
    const album: Album = await this.findOne(albumId, userId);
    
    const imageId = addImageToAlbumDto.imageId;
    const imageToAdd: Image = await this.imagesService.getById(imageId, userId);

    if (!imageToAdd) throw new NotFoundException("Image does not exist.");
    
    album.images.push(imageToAdd);
    // Bug here, can return duplicates. Either should return something else, or
    // do a query after the save has happened.
    return await this.albumsRepository.save(album);
  }

  async removeImageFromAlbum(albumId: string, imageId: string, userId: string){
    const album: Album = await this.findOne(albumId, userId);
    const foundImage: Image = await this.imagesService.getImageFromDatabase(imageId, userId);

    // Bug here.
    if(!album || !foundImage) return new HttpException('The album or image does not exist', HttpStatus.NOT_FOUND);

    album.images = album.images.filter(image => image.id !== imageId);
    return await this.albumsRepository.save(album);
  }
}
