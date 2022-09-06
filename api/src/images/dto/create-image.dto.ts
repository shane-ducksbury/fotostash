// These are data transfer objects, to help create a representation of body etc.

import { ApiProperty } from '@nestjs/swagger'
import { IsAlphanumeric, MaxLength } from 'class-validator'

export class CreateImageDto {
    @ApiProperty()
    @IsAlphanumeric()
    @MaxLength(10)
    name: string;


    @ApiProperty({required: false})
    age?: number;
}