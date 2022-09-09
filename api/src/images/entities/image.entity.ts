import { ApiProperty } from '@nestjs/swagger'
import { Album } from 'src/albums/entities/album.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';


@Entity()
export class Image {
    @ApiProperty()
    @PrimaryColumn("uuid")
    id: string;
    
    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    imageUrl: string;

    @ManyToMany(() => Album, (album) => album.images)
    albums: Album[]
}