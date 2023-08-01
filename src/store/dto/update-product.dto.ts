import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {IsNumber, IsString} from 'class-validator'

export class UpdateProductDto extends PartialType(CreateProductDto) {
    
    @IsString()
    name:string;

    @IsNumber()
    price:number;

    @IsString()
    image:string;
}
