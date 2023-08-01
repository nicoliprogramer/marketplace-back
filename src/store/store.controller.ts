import { Body, Controller, Get, Param, Patch, UseGuards} from '@nestjs/common';
import { StoreService } from './store.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StoreEntity } from './entities/store.entity';

@Controller('store')
export class StoreController {
constructor(private readonly StoreService: StoreService) {}
   
@Get()
 async findAll() {
   const stock = await this.StoreService.findAll();
   return stock;
 }


@Patch(':id')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiOkResponse({ type: StoreEntity})
  async update(@Param('id') id: string, @Body() product: UpdateProductDto) {
    return await this.StoreService.update(+id, product);
  }
}