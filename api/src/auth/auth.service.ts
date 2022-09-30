import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){}

    async validateUser(email: string, password: string): Promise<any>{
        const user = await this.usersService.findOne(email);

        if(!user) {
            return null
        }

        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if(user && isMatch){
            return user;
        }
        return null
    }

    async login(user: User){
        const payload = { sub: user.id };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
