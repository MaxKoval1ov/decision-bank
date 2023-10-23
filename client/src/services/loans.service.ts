import { SuggestLoanDto } from '@dto/suggestLoan.dto';
import { axios } from '@libs/axios';
import { LoanResponse } from 'types/loan.response';
import { SuggestLoanResponse } from 'types/suggestLoan.response';
import { CreateLoanDto } from '@dto/createLoan.dto';

export const loansService = {
    getUserLoans: () => {
        return axios.get<LoanResponse[]>('/loan');
    },
    suggestUserLoan: (data: SuggestLoanDto) => {
        return axios.post<SuggestLoanResponse>('/loan/suggest', data);
    },

    createUserLoan: (data: CreateLoanDto) => {
        return axios.post('/loan', data);
    },
};
