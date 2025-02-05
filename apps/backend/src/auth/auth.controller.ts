import { 
    Body, 
    Controller, 
    HttpCode, 
    HttpStatus, 
    Post
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post(':login')
    signIn(@Body() signInDto: AuthDto) {
        return this.authService.signIn(signInDto);
    }

    /// This route is protected by the AuthGuard and is only testing purposes, for the sake of this example
    /* @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    } */
}
