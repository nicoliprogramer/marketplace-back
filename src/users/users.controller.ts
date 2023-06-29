import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post()
  async create(@Body() CreateUserDto: CreateUserDto) {
    return  await this.UsersService.create(CreateUserDto);
  }

  @Get()
  async findAll() {
    return await this.UsersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.UsersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return await this.UsersService.update(+id, UpdateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.UsersService.remove(+id);
  }
}
