import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity'
import { MinioClientModule } from 'src/minio-client/minio-client.module';


@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [
    TypeOrmModule.forFeature([Image]),
    MinioClientModule
  ],
  exports: [ImagesService]
})
export class ImagesModule {}
