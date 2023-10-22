import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigHelperService {
  constructor(private readonly configService: ConfigService) {}

  getAccessTokenSecret(): string {
    return this.configService.get('ACCESS_TOKEN_SECRET');
  }

  getAccessTokenExpirationTime(): number {
    console.log(this.configService.get('REFRESH_TOKEN_TIME'));

    return Number(this.configService.get('ACCESS_TOKEN_TIME'));
  }

  getRefreshTokenSecret(): string {
    return this.configService.get('REFRESH_TOKEN_SECRET');
  }

  getRefreshTokenExpirationTime(): number {
    console.log(this.configService.get('REFRESH_TOKEN_TIME'));
    return Number(this.configService.get('REFRESH_TOKEN_TIME'));
  }
}
