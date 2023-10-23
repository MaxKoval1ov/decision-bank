import { IsNumber } from 'class-validator';

export class CreateLoanDto {
  @IsNumber()
  loanAmount: number;
  @IsNumber()
  loanPeriod: number;
  @IsNumber()
  creditScore: number;
}
