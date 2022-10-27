import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AlbumsService } from './albums.service';
import { AddImageToAlbumDto } from './dto/add-image-to-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@ApiTags('Albums')
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @ApiCreatedResponse({type: Album})
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto, @Request() req) {
    return this.albumsService.create(createAlbumDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/add-image')
  addImageToAlbum(@Param('id') id: string, @Body() addImageToAlbumDto: AddImageToAlbumDto, @Request() req): Promise<Album> {
    return this.albumsService.addImageToAlbum(id, addImageToAlbumDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.albumsService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.albumsService.findOne(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(+id, updateAlbumDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.albumsService.delete(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/:imageId')
  removeImageFromAlbum(@Param('id') albumId: string, @Param('imageId') imageId: string, @Request() req){
    this.albumsService.removeImageFromAlbum(albumId, imageId, req.user.id);
  }
}
