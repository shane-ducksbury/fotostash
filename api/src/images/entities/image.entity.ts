import { ApiProperty } from '@nestjs/swagger'
import { Album } from 'src/albums/entities/album.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';


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

    @ManyToMany(() => Album, (album) => album.images, { onDelete: 'CASCADE' })
    albums: Album[]

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({name: "imageOwnerId"})
    imageOwnerId: string;
}