import { Body, Controller, Delete, Get, Request, NotFoundException, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger'

import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity'
import { ImagesService } from './images.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { UpdateImageDto } from './dto/update-image.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Get()
  getImages(@Request() req): Promise<Image[]> {
    return this.imagesService.getAll(req.user.id);
  }

  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Get('/trash')
  getTrashedImages(@Request() req): Promise<Image[]> {
    return this.imagesService.getTrash(req.user.id);
  }

  @ApiOkResponse({ type: Image, description: 'The Image'})
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getImageById(@Param('id') id: string, @Request() req): Promise<Image> { 
    return this.imagesService.getById(id, req.user.id);    
  }

  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateImageDetails(@Param('id') id: string, @Body() body: UpdateImageDto, @Request() req): Promise<Image> {
    return this.imagesService.updateImage(id, body, req.user.id);
  }

  // @ApiCreatedResponse({type: Image})
  // @Post()
  // createImage(@Body() body: CreateImageDto): Image {
  //   return this.imagesService.createImage(body);
  // }

  @Delete('/trash')
  @UseGuards(JwtAuthGuard)
  emptyTrash(@Request() req) {
    this.imagesService.emptyTrash(req.user.id);
  }

  @ApiCreatedResponse()
  @UseGuards(JwtAuthGuard)
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: BufferedFile, @Request() req): any {
    return this.imagesService.uploadImage(file, req.file.buffer, req.user.id);
  }
}
