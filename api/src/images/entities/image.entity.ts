import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryColumn } from 'typeorm';


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
}