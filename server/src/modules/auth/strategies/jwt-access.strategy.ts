import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtAccessStrategy } from './constants/jwt-access.const';
import { ConfigHelperService } from 'src/modules/config/config.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  jwtAccessStrategy,
) {
  constructor(readonly configService: ConfigHelperService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getAccessTokenSecret(),
    });
  }

  async validate(payload: any) {
    return { id: payload.id, username: payload.username };
  }
}
