import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigHelperService {
  constructor(private readonly configService: ConfigService) {}

  getAccessTokenSecret(): string {
    return this.configService.get('ACCESS_TOKEN_SECRET');
  }

  getAccessTokenExpirationTime(): number {
    return Number(this.configService.get('ACCESS_TOKEN_TIME'));
  }

  getRefreshTokenSecret(): string {
    return this.configService.get('REFRESH_TOKEN_SECRET');
  }

  getRefreshTokenExpirationTime(): number {
    return Number(this.configService.get('REFRESH_TOKEN_TIME'));
  }

  getMinCreditScore(): number {
    return Number(this.configService.get('MIN_CREDIT_SCORE'));
  }
}
