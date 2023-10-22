import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/utils/prisma.module';
import { ConfigHelperModule } from '../config/config.module';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';

@Module({
  imports: [PrismaModule, ConfigHelperModule],
  controllers: [LoanController],
  providers: [LoanService],
})
export class LoanModule {}
