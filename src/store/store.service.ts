import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class StoreService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
    return this.prisma.store.findMany({});
  }

  async update(id: number, UpdateStoreDto: UpdateProductDto) {
    const updateProduct = await this.prisma.store.update({
      data: UpdateStoreDto,
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
