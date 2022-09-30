import { Body, Controller, Post } from '@nestjs/common';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    registerUser(@Body() userDetails: UserRegistrationDto) {
        return this.usersService.registerUser(userDetails);
    }
}
