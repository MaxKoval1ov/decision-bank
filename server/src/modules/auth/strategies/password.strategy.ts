import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { passwordStrategy } from './constants/password.const';

@Injectable()
export class PasswordStrategy extends PassportStrategy(
  Strategy,
  passwordStrategy,
) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<Partial<User>> {
    const user = await this.authService.getUserIfPasswordValid({
      username,
      password,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid login');
    }

    return user;
  }
}
