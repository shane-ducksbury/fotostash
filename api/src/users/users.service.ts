import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ){}

    async generateHashedPassword(password: string): Promise<string>{
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds)
    }

    async findOne(email: string): Promise<User | undefined>{
        const user = this.userRepository.findOne({
            where: {
                email: email
            }
        });
        return user;
    }

    async registerUser(userDetails: UserRegistrationDto): Promise<any>{
        const foundUser = await this.findOne(userDetails.email);
        if(foundUser) return new UnprocessableEntityException();

        const newUserUUID = uuidv4();

        const hashedPassword = await this.generateHashedPassword(userDetails.password);

        const newUser = this.userRepository.create({
            id: newUserUUID,
            email: userDetails.email,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            hashedPassword: hashedPassword
        })

        try {
            await this.userRepository.save(newUser);
        } catch {
            throw new UnprocessableEntityException()
        }

        return 'Created'
    }
}
