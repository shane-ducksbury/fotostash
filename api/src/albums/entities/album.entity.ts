import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Image } from 'src/images/entities/image.entity'
import { User } from "src/users/entities/user.entity";


@Entity()
export class Album {
    @ApiProperty()
    @PrimaryColumn()
    id: string;
    
    @ApiProperty()
    @Column()
    name: string;

    @ManyToMany(() => Image, (image) => image.albums, { onDelete: 'CASCADE' })
    @JoinTable()
    images: Image[];

    @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({name: "albumOwnerId"})
    albumOwnerId: string;
}
