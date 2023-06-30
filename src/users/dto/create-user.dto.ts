import {IsNotEmpty, IsString, isInt, isNumber} from 'class-validator'

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsString()
    password:string;
}
