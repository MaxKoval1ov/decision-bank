import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from 'src/guards/jwt-access.guard';
import { LoanService } from './loan.service';
import { UserReq } from 'src/decorators/user.decorator';
import { User } from '@prisma/client';

@ApiBearerAuth()
@ApiTags('loan')
@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @UseGuards(JwtAccessGuard)
  @Get('test')
  async checkTest(@UserReq() user: User) {
    console.log(user);
    return this.loanService.test();
  }
}
