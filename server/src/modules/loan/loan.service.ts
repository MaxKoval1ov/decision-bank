import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';

const personalCodes: { [key: string]: string } = {
  '49002010965': 'debt',
  '49002010976': 'segment 1',
  '49002010987': 'segment 2',
  '49002010998': 'segment 3',
};

const creditModifiers: { [key: string]: number } = {
  'segment 1': 100,
  'segment 2': 300,
  'segment 3': 1000,
};

@Injectable()
export class LoanService {
  constructor(private readonly prismaService: PrismaService) {}
  createDecision(
    personalCode: string,
    loanAmount: number,
    loanPeriod: number,
  ): [string, number] {
    // Check if the personal code is in the database
    if (personalCode in personalCodes) {
      if (personalCodes[personalCode] === 'debt') {
        return ['negative', 0]; // Person has debt, so no loan is approved.
      }

      // Calculate the credit modifier based on the segment
      const segment = personalCodes[personalCode];
      const creditModifier = creditModifiers[segment] || 0;

      // Determine the maximum loan amount based on credit modifier
      const maxLoanAmount = loanAmount + creditModifier;

      // If the requested amount is higher than the maximum, use the maximum
      if (loanAmount > maxLoanAmount) {
        return ['positive', maxLoanAmount];
      } else {
        return ['positive', loanAmount];
      }
    } else {
      return ['negative', 0]; // Unknown personal code, cannot approve a loan.
    }
  }

  test() {
    return this.prismaService.loan.findMany();
  }
}
