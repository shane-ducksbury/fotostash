import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Image } from 'src/images/entities/image.entity'


@Entity()
export class Album {
    @ApiProperty()
    @PrimaryColumn()
    id: string;
    
    @ApiProperty()
    @Column()
    name: string;

    @ManyToMany(() => Image, (image) => image.albums)
    @JoinTable()
    images: Image[];
}
