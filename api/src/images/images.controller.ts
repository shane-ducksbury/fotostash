import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger'

import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity'
import { ImagesService } from './images.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { UpdateImageDto } from './dto/update-image.dto';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @ApiOkResponse()
  @Get()
  getImages(): Promise<Image[]> {
    return this.imagesService.getAll();
  }

  @ApiOkResponse()
  @Get('/trash')
  getTrashedImages(): Promise<Image[]> {
    return this.imagesService.getTrash();
  }

  @ApiOkResponse({ type: Image, description: 'The Image'})
  @ApiNotFoundResponse()
  @Get(':id')
  getImageById(@Param('id') id: string): Promise<Image> { 
    return this.imagesService.getById(id);    
  }

  @ApiOkResponse()
  @Patch(':id')
  updateImageDetails(@Param('id') id: string, @Body() body: UpdateImageDto): Promise<Image> {
    return this.imagesService.updateImage(id, body);
  }

  @ApiCreatedResponse({type: Image})
  @Post()
  createImage(@Body() body: CreateImageDto): Image {
    return this.imagesService.createImage(body);
  }

  @Delete('/trash')
  emptyTrash() {
    this.imagesService.emptyTrash();
  }

  @ApiCreatedResponse()
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: BufferedFile): any {
    return this.imagesService.uploadImage(file);
  }
}
