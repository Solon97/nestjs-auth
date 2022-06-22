import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcrypt";
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserToken } from './dto/user-token.dto';
import { UserPayload } from './jwt/interfaces/UserPayload';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, 
            private readonly userService: UserService) {}

    async login(email: string, password: string): Promise<UserToken> {
        const user: User = await this.validateUser(email, password)

        const payload: UserPayload = {
            username: user.email,
            sub: user.id
        }

        return {
            accessToken: this.jwtService.sign(payload)
        }
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email)
        if(!user) {
            throw new UnauthorizedException("User not Found");
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) {
            throw new UnauthorizedException("Invalid password");
        }

        return user
    }
}
