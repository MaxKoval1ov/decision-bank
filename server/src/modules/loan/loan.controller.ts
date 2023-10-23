import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from 'src/guards/jwt-access.guard';
import { LoanService } from './loan.service';
import { UserReq } from 'src/decorators/user.decorator';
import { User } from '@prisma/client';
import { SuggestLoanDto } from './dto/suggest-loan.dto';

@ApiTags('loan')
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get()
  async checkTest(@UserReq() user: User) {
    return this.loanService.getUserLoans(user);
  }

  @Post('suggest')
  async suggestLoan(
    @UserReq() user: User,
    @Body() suggestLoanDto: SuggestLoanDto,
  ) {
    return this.loanService.suggestLoan(user, suggestLoanDto);
  }

  // @Post()
  // async createLoan() {
  //   return this.loanService.createLoan();
  // }
}
