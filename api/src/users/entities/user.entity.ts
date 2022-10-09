import { ApiProperty } from "@nestjs/swagger";
import { Image } from "src/images/entities/image.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";


@Entity()
export class User {
    @ApiProperty()
    @PrimaryColumn()
    id: string;

    @ApiProperty()
    @Column()
    hashedPassword: string;

    @ApiProperty()
    @Column()
    firstName: string;

    @ApiProperty()
    @Column()
    lastName: string;

    @ApiProperty()
    @Column()
    email: string;

    @OneToMany(() => Image, image => image.imageOwnerId)
    @JoinColumn({name: "images"})
    images: Image[];
}