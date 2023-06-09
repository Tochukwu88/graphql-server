import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './auth.strategy';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    UsersService,
    PrismaService,
    JwtService,
    JwtStrategy,
  ],
})
export class AuthModule {}
