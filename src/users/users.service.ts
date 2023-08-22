import { ConflictException, Injectable} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: RegisterUserDto) {
    try {
      const createData = await this.prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: user.password
      }
    });
      const token = await jwt.sign({id: createData.id, username: createData.username}, process.env.TOKEN_SECRET)
    return{
      token
    }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError &&
         error.code === 'P2002') throw new ConflictException('Username already register') 
      throw error;
    }
  }

  async findAll() {
    return this.prisma.user.findMany({});
  }

  async findOne(id: number) {
    const dataUser = await this.prisma.user.findUnique({
      where: {id}
    })
    return {
      statusCode: 200,
      data: dataUser
    }

  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = await this.prisma.user.update({
      data: updateUserDto,
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
