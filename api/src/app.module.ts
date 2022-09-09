import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesModule } from './images/images.module';
import { MinioClientModule } from './minio-client/minio-client.module';


import config from 'ormconfig';
import { ConfigModule } from '@nestjs/config';
import { AlbumsModule } from './albums/albums.module';
import { Album } from './albums/entities/album.entity';
import { Image } from './images/entities/image.entity'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ImagesModule,
    TypeOrmModule.forRoot(config),
    MinioClientModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AlbumsModule
  ],
})
export class AppModule {}
