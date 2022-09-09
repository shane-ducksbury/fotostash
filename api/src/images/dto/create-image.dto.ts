// These are data transfer objects, to help create a representation of body etc.

import { ApiProperty } from '@nestjs/swagger'
import { IsAlphanumeric } from 'class-validator'

export class CreateImageDto {
    @ApiProperty()
    @IsAlphanumeric()
    name: string;
}