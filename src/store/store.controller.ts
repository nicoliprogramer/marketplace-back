import { Controller, Get} from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
constructor(private readonly StoreService: StoreService) {}
   
@Get()
 async findAll() {
   const stock = await this.StoreService.findAll();
   return stock;
 }
}
