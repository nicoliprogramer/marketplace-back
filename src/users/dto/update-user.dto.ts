import { PartialType } from '@nestjs/mapped-types';
import { LoginUserDto } from './login-user.dto';
import {IsString} from 'class-validator'

export class UpdateUserDto extends PartialType(LoginUserDto) {
    
    @IsString()
    username:string;

    @IsString()
    password:string;
}
