import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { request } from 'http';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any {
      // return req.body
      return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('validate')
    validate(@Request() req): any{
      return 'Valid'
    }
}
