import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesModule } from './images/images.module';
import { MinioClientModule } from './minio-client/minio-client.module';


import config from 'ormconfig';
import { ConfigModule } from '@nestjs/config';
import { AlbumsModule } from './albums/albums.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ImageProcessorService } from './image-processor/image-processor.service';
import { ImageProcessorModule } from './image-processor/image-processor.module';

@Module({
  controllers: [AppController],
  providers: [AppService, ImageProcessorService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ImagesModule,
    TypeOrmModule.forRoot(config),
    MinioClientModule,
    AlbumsModule,
    UsersModule,
    AuthModule,
    ImageProcessorModule
  ],
})
export class AppModule {}
