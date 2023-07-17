import {IsNotEmpty, IsString, isInt, isNumber, IsEmail} from 'class-validator'

export class RegisterUserDto {
    @IsNotEmpty()
    @IsEmail()
    email:string;
    
    @IsNotEmpty()
    @IsString()
    username:string;    

    @IsNotEmpty()
    @IsString()
    password:string;
}
