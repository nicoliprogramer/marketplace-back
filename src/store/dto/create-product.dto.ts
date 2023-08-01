import {IsNotEmpty, IsNumber, IsString} from 'class-validator'

export class CreateProductDto {

    @IsString()
    name:string;

    @IsNotEmpty()
    @IsNumber()
    price:number;
    
    @IsNotEmpty()
    @IsString()
    image:string;
}
