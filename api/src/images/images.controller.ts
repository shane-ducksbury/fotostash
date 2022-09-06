import { Body, Controller, Get, NotFoundException, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger'

import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity'
import { ImagesService } from './images.service';
import { BufferedFile } from 'src/minio-client/file.model';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  // Dependency Injection (Really should learn more about this)
  constructor(private imagesService: ImagesService) {}

  // // Empty Get Request
  // @Get()
  // getImages(): Image[] {
  //   return this.imagesService.findAll();
  // }

  // Adding in a get request with query params
  @ApiOkResponse()
  @Get()
  getImages(): Promise<Image[]> {
    return this.imagesService.getAll();
  }

  // Parameter Get
  @ApiOkResponse({ type: Image, description: 'The Image'})
  @ApiNotFoundResponse()
  @Get(':id')
  getImageById(@Param('id') id: string): Image { 
    const image = this.imagesService.findById(id);

    if (!image){
      throw new NotFoundException();
    }
    return image;
  }

  @ApiCreatedResponse({type: Image})
  @Post()
  createImage(@Body() body: CreateImageDto): Image {
    return this.imagesService.createImage(body);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: BufferedFile): any {
    return this.imagesService.uploadImage(file);
  }
}
