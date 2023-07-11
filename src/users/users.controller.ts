import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post('register')
  async create(@Body() user: CreateUserDto) {
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    return  await this.UsersService.create({... user, password: hash});
  }

  @Post('login')
  async login(@Body() body: CreateUserDto){
  const user = await this.UsersService.login(body);
    return user
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
  async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return await this.UsersService.update(+id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.UsersService.remove(+id);
  }
}