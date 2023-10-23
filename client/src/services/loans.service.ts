import { axios } from '@libs/axios';
import { LoanResponse } from 'types/loan.response';

export const loansService = {
    getUserLoans: () => {
        return axios.get<LoanResponse[]>('/loan');
    },
};
