-- CreateEnum
CREATE TYPE "Decision" AS ENUM ('POSITIVE', 'NEGATIVE');

-- CreateTable
CREATE TABLE "Segment" (
    "id" SERIAL NOT NULL,
    "creditModifier" DOUBLE PRECISION NOT NULL,
    "segmentIdentifier" TEXT NOT NULL,

    CONSTRAINT "Segment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "segmentId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" SERIAL NOT NULL,
    "loanAmount" INTEGER NOT NULL,
    "loanPeriod" INTEGER NOT NULL,
    "creditScore" DOUBLE PRECISION NOT NULL,
    "decision" "Decision" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanValidation" (
    "id" SERIAL NOT NULL,
    "maxLoanAmount" INTEGER NOT NULL,
    "minLoanAmount" INTEGER NOT NULL,
    "maxLoanPeriod" INTEGER NOT NULL,
    "minLoanPeriod" INTEGER NOT NULL,

    CONSTRAINT "LoanValidation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Segment_segmentIdentifier_key" ON "Segment"("segmentIdentifier");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_segmentId_fkey" FOREIGN KEY ("segmentId") REFERENCES "Segment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
