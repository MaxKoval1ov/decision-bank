import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { RefreshTokenPayload } from 'src/models/refresh-token.payload';
import { PrismaService } from 'src/utils/prisma.service';
import { ConfigHelperService } from '../config/config.service';
import { LogInDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigHelperService,
  ) {}

  async getUserIfPasswordValid({
    username,
    password,
  }: LogInDto): Promise<Partial<User> | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async getUserIfRefreshValid(refreshToken: string): Promise<User | null> {
    const refreshTokenPayload = this.jwtService.decode(
      refreshToken,
    ) as RefreshTokenPayload;

    const user = await this.prismaService.user.findUnique({
      where: { username: refreshTokenPayload.username },
    });

    if (!user) return null;

    const tokens = await this.prismaService.token.findFirst({
      where: { refreshToken, userId: user.id },
    });

    if (!tokens) return null;

    return user;
  }

  async createTokens(user: User) {
    const payload = { username: user.username, id: user.id };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.getAccessTokenSecret(),
        expiresIn: this.configService.getAccessTokenExpirationTime(),
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.getRefreshTokenSecret(),
        expiresIn: this.configService.getRefreshTokenExpirationTime(),
      }),
    };
  }

  async login(user: User) {
    const tokens = await this.createTokens(user);

    await this.prismaService.token.create({
      data: {
        userId: user.id,
        refreshToken: tokens.refreshToken,
      },
    });

    return tokens;
  }

  async refreshTokens(user: User) {
    return this.login(user);
  }
}
