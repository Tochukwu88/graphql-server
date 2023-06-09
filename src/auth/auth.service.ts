import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { SignUpInput } from './dto/signUp.input';

import { UsersService } from 'src/users/users.service';
import { AuthResponse } from './dto/auth.response';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { SignInInput } from './dto/signIn.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signUp(signup: SignUpInput): Promise<AuthResponse> {
    try {
      const hashedPassword = await argon.hash(signup.password);
      const user = await this.userService.createUser({
        name: signup.name,
        email: signup.email,
        password: hashedPassword,
      });
      const accessToken = await this.createToken(user.id, user.email);

      return { accessToken, user };
    } catch (error) {
      console.log(error);
      throw new Error('Error occurred contact support');
    }
  }
  async signIn(signin: SignInInput): Promise<AuthResponse> {
    const user = await this.userService.findUserByEmail(signin.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const comparePassword = await argon.verify(user.password, signin.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = await this.createToken(user.id, user.email);
    return { accessToken, user };
  }

  async createToken(userId: number, email: string): Promise<string> {
    const accessToken = this.jwtService.sign(
      { userId, email },
      {
        expiresIn: '7d',
        secret: this.configService.get('ACCESS_TOKEN_SECRET_KEY'),
      },
    );

    return accessToken;
  }
}
