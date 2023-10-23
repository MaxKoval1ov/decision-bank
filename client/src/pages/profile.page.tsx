import { useAuth } from '@hooks/userAuth.hook';
import Person from '@mui/icons-material/Person';
import { BasicPage } from './basic.page';
import { useEffect, useState } from 'react';
import { loansService } from '@services/loans.service';
import { LoanResponse } from 'types/loan.response';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

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
            <BasicPage
                title={`${user.username} Profile Page`}
                icon={<Person />}
            />
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
