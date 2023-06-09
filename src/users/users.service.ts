import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { Iuser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: Iuser): Promise<Iuser> {
    return await this.prisma.user.create({
      data: { name: data.name, email: data.email, password: data.password },
    });
  }
  async findUserByEmail(email: string): Promise<Iuser> {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
