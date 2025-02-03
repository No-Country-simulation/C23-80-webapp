import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/pw-hasher';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UsersService, 
        private readonly jwtService: JwtService
    ) {}

    async signIn(authDto: AuthDto) {
        const user = await this.userService.findOne(authDto.email);
        if (user && await comparePassword(authDto.password, user.password)) {
            const { id, email, role, permissions } = user;
            const payload = { id, email, role, permissions };
            return {
                access_token: await this.jwtService.signAsync(payload)
            }
        } 

        throw new UnauthorizedException();
    }
}
