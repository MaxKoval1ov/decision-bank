import { Decision, PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();
  console.log('Seeding...');

  /// --------- Segments ---------------
  const debtSegment = await prisma.segment.create({
    data: {
      creditModifier: 0,
      segmentIdentifier: 'debt',
    },
  });

  const segment1 = await prisma.segment.create({
    data: {
      creditModifier: 100,
      segmentIdentifier: 'segment 1',
    },
  });

  const segment2 = await prisma.segment.create({
    data: {
      creditModifier: 300,
      segmentIdentifier: 'segment 2',
    },
  });

  const segment3 = await prisma.segment.create({
    data: {
      creditModifier: 1000,
      segmentIdentifier: 'segment 3',
    },
  });

  /// --------- Users ---------------
  const userDebt = await prisma.user.create({
    data: {
      username: 'debt',
      password: 'password',
      segmentId: debtSegment.id,
    },
  });

  const userSeg1 = await prisma.user.create({
    data: {
      username: 'segment1',
      password: 'password',
      segmentId: segment1.id,
    },
  });

  const userSeg2 = await prisma.user.create({
    data: {
      username: 'segment2',
      password: 'password',
      segmentId: segment2.id,
    },
  });

  const userSeg3 = await prisma.user.create({
    data: {
      username: 'segment3',
      password: 'password',
      segmentId: segment3.id,
    },
  });

  /// --------- Loans ---------------
  await Promise.all(
    [userDebt, userSeg1, userSeg2, userSeg3].map((user) =>
      prisma.loan.createMany({
        data: [
          {
            userId: user.id,
            loanAmount: 100,
            loanPeriod: 100,
            creditScore: 100,
            decision: Decision.POSITIVE,
          },
          {
            userId: user.id,
            loanAmount: 120,
            loanPeriod: 120,
            creditScore: 120,
            decision: Decision.NEGATIVE,
          },
        ],
      }),
    ),
  );
  await prisma.loanValidation.create({
    data: {
      minLoanAmount: 2000,
      maxLoanAmount: 12000,
      minLoanPeriod: 12,
      maxLoanPeriod: 60,
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();

    console.log('Seeding is complete');
  });
