import { ApiProperty } from '@nestjs/swagger';
import { Store } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Exclude } from 'class-transformer';

export class StoreEntity implements Store {
  constructor(partial: Partial<StoreEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: Decimal;

  @ApiProperty()
  image: string;
}