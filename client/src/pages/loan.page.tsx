import LoanForm from '@components/loanForm/laonForm';
import { BasicPage } from './basic.page';

export const LoanPage = () => {
    return (
        <>
            <BasicPage title="Loan Page" icon={null} />
            <LoanForm />
        </>
    );
};
