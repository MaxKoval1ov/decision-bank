import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtAccessStrategy } from 'src/modules/auth/strategies/constants/jwt-access.const';

@Injectable()
export class JwtAccessGuard extends AuthGuard(jwtAccessStrategy) {}
