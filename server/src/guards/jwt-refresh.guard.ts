import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtRefreshStrategy } from 'src/modules/auth/strategies/constants/jwt-refresh.const';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(jwtRefreshStrategy) {}
