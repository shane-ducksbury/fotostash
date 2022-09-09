import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, MaxLength } from "class-validator";

export class CreateAlbumDto {
    @ApiProperty()
    // @IsAlphanumeric()
    // @MaxLength(30)
    name: string;
}
