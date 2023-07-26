import { Injectable, UnauthorizedException,NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,
                private jwtService: JwtService) {}

  async login(user: LoginDto) {
    const userData = await this.prisma.user.findUnique({
      where: {username: user.username}
    })
    if (!userData) {
      throw new NotFoundException(`No user found for username: ${user.username}`);
    }

    const isMatch = await bcrypt.compare(user.password , userData.password)
    if(!isMatch){
        throw new BadRequestException("User not found");
        }

    return {
      accessToken: this.jwtService.sign({ userId: userData.id })
    }
}}