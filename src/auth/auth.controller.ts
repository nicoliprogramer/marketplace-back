import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entity/auth.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    @ApiOkResponse({ type: AuthEntity })
    login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto); 
    }
}
