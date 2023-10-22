import { Module } from '@nestjs/common';
import { LoanModule } from './modules/loan/loan.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthModule, LoanModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
