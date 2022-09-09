import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { Album } from './entities/album.entity';
import { Image } from 'src/images/entities/image.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [
    TypeOrmModule.forFeature([Image]),
    TypeOrmModule.forFeature([Album])
  ]
})
export class AlbumsModule {}
