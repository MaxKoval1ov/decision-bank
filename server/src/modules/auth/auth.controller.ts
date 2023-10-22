import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserReq } from 'src/decorators/user.decorator';
import { JwtRefreshGuard } from 'src/guards/jwt-refresh.guard';
import { PasswordAuthGuard } from 'src/guards/password-auth.guard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  })
  @UseGuards(PasswordAuthGuard)
  @Post('login')
  async login(@UserReq() user: User) {
    return this.authService.login(user);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: {
          type: 'string',
        },
      },
    },
  })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refreshTokens(@UserReq() user: User) {
    return this.authService.createTokens(user);
  }
}
