import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigHelperService } from 'src/modules/config/config.service';
import { AuthService } from '../auth.service';
import { jwtRefreshStrategy } from './constants/jwt-refresh.const';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  jwtRefreshStrategy,
) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigHelperService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.body?.refreshToken,
      ]),
      secretOrKey: configService.getRefreshTokenSecret(),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request): Promise<any> {
    const refreshToken = req.body.refreshToken;
    const user = await this.authService.getUserIfRefreshValid(refreshToken);

    if (!user) throw new UnauthorizedException('Wrong credential');

    return user;
  }
}
