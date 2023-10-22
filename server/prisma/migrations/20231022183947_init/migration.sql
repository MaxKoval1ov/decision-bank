-- CreateEnum
CREATE TYPE "Decision" AS ENUM ('POSITIVE', 'NEGATIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hasDebt" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" SERIAL NOT NULL,
    "loanAmount" INTEGER NOT NULL,
    "loanPeriod" INTEGER NOT NULL,
    "creditScore" DOUBLE PRECISION NOT NULL,
    "decision" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
