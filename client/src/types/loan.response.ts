import { DecisionEnum } from './decision.enum';

export interface LoanResponse {
    id: number;
    loanAmount: number;
    loanPeriod: number;
    creditScore: number;
    decision: DecisionEnum;
}
