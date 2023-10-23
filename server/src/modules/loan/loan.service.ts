import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { SuggestLoanDto } from './dto/suggest-loan.dto';
import { unavailableSegments } from './constansts/unavailable-segments';
import { ConfigHelperService } from '../config/config.service';

@Injectable()
export class LoanService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigHelperService,
  ) {}

  async calculateCreditScore(
    user: {
      segment: {
        id: number;
        creditModifier: number;
        segmentIdentifier: string;
      };
    } & {
      id: number;
      username: string;
      password: string;
      segmentId: number;
    },
    { loanPeriod, amount }: SuggestLoanDto,
  ) {
    return (user.segment.creditModifier / amount) * loanPeriod;
  }

  async suggestLoan(user: User, suggestLoanDto: SuggestLoanDto) {
    const userWithSegment = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
      include: { segment: true },
    });

    if (!userWithSegment)
      throw new ForbiddenException('Something wrong with user');

    if (unavailableSegments.includes(userWithSegment.segment.segmentIdentifier))
      throw new ForbiddenException('User has a debt');

    const [loanValidations, creditScore] = await Promise.all([
      await this.prismaService.loanValidation.findMany({
        where: {
          minLoanAmount: {
            lte: suggestLoanDto.amount,
          },
          minLoanPeriod: {
            lte: suggestLoanDto.loanPeriod,
          },
          maxLoanPeriod: {
            gte: suggestLoanDto.loanPeriod,
          },
        },
      }),
      this.calculateCreditScore(userWithSegment, suggestLoanDto),
    ]);

    if (creditScore < this.configService.getMinCreditScore())
      throw new ForbiddenException('User has low credit score');

    if (!loanValidations.length)
      throw new ForbiddenException('No available loans');

    return {
      maxAmount: Math.max(
        ...loanValidations.map(({ maxLoanAmount }) => maxLoanAmount),
      ),
      minAmount: Math.max(
        ...loanValidations.map(({ minLoanAmount }) => minLoanAmount),
      ),
    };
  }

  async getUserLoans(user: User) {
    return this.prismaService.loan.findMany({
      where: {
        userId: user.id,
      },
    });
  }
}
