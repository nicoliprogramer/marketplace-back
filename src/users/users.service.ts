import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    try {
      const createData = await this.prisma.user.create({
      data: {
        username: user.username,
        password: user.password
      }
    });
    return{
      statusCode: 200,
      data: createData
    }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError &&
         error.code === 'P2002') throw new ConflictException('Username already register') 
      throw error;
    }
  }

  async findAll() {
    const dataUser = await this.prisma.user.findMany({});
    return {
      statusCode: 200,
      data: dataUser
    }
  }

  async findOne(id: number) {
    const dataUser = await this.prisma.user.findFirst({
      where: {
        id
      }
    });
    return {
      statusCode: 200,
      data: dataUser
    }

  }

  async update(id: number, UpdateUserDto: UpdateUserDto) {
    const updateUser = await this.prisma.user.update({
      data: UpdateUserDto,
      where: {
        id
      }
    })
    return {
      statusCode: 200,
      data: updateUser
    };
  }

  async remove(id: number) {
    const deleteUser = await this.prisma.user.delete({
      where: {id}
    })
    return {
      statusCode: 200,
      data: deleteUser,
      message: `Success delete ${id}`
    };
  }
}
