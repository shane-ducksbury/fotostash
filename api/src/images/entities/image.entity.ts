import { ApiProperty } from '@nestjs/swagger'
import { Album } from 'src/albums/entities/album.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { ImageInfo } from './image-info.entity';


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

    @Column()
    deleted: boolean;

    @Column()
    dateTime: string;

    @ManyToMany(() => Album, (album) => album.images, { onDelete: 'CASCADE' })
    albums: Album[];

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({name: "imageOwnerId"})
    imageOwnerId: string;

    @OneToOne(() => ImageInfo, imageInfo => imageInfo.infoId, { onDelete: 'CASCADE' })
    @JoinColumn({name: "imageInfo"})
    imageInfo: string;
}