import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";


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
}