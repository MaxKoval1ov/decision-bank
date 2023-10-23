import { IsNumber } from 'class-validator';

export class SuggestLoanDto {
  @IsNumber()
  loanPeriod: number;

  @IsNumber()
  amount: number;
}
