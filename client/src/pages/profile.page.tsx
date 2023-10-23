import { useAuth } from '@hooks/userAuth.hook';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { loansService } from '@services/loans.service';
import { useEffect, useState } from 'react';
import { LoanResponse } from 'types/loan.response';
import { BasicPage } from './basic.page';

export const ProfilePage = () => {
    const { user } = useAuth();
    const [loans, setLoans] = useState<LoanResponse[]>([]);

    useEffect(() => {
        loansService.getUserLoans().then((res) => {
            setLoans(res);
        });
    }, []);

    return (
        <>
            <BasicPage title={`${user.username} Profile Page`} icon={null} />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Loan ID</TableCell>
                            <TableCell>Loan Amount</TableCell>
                            <TableCell>Loan Period</TableCell>
                            <TableCell>Credit Score</TableCell>
                            <TableCell>Decision</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loans.map((loan) => (
                            <TableRow key={loan.id}>
                                <TableCell>{loan.id}</TableCell>
                                <TableCell>{loan.loanAmount}</TableCell>
                                <TableCell>{loan.loanPeriod}</TableCell>
                                <TableCell>{loan.creditScore}</TableCell>
                                <TableCell>{loan.decision}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
        // </BasicPage>
    );
};
