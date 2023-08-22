import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class StoreService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
    return this.prisma.store.findMany({});
  }

  async update(id: number, updateStoreDto: UpdateProductDto) {
    const updateProduct = await this.prisma.store.update({
      data: updateStoreDto,
      where: {
        id
      }
    })
    return {
      statusCode: 200,
      data: updateProduct
    };
  }

}
