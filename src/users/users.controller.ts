import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

const saltOrRounds = 10;

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post('register')
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() user: RegisterUserDto) {
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    return  await this.UsersService.create({... user, password: hash});
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity})
   async findAll() {
    const users = await this.UsersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

   @Get(':id')
   @UseGuards(JwtAuthGuard)
   @ApiBearerAuth()
   @ApiOkResponse({ type: UserEntity})
   async findOne(@Param('id') id: string) {
    return await this.UsersService.findOne(+id);
  }


  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity})
  async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return await this.UsersService.update(+id, user);
  }

  
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity})
  async remove(@Param('id') id: string) {
    return await this.UsersService.remove(+id);
  }
}