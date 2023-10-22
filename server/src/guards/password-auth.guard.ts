import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { passwordStrategy } from 'src/modules/auth/strategies/constants/password.const';

@Injectable()
export class PasswordAuthGuard extends AuthGuard(passwordStrategy) {}
