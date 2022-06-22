import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './jwt/public.decorator';

@Controller()
export class AuthController {
    constructor (private readonly authService: AuthService) {}
    
    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() {email, password}: LoginDto) {
        return this.authService.login(email, password)
    }
}
