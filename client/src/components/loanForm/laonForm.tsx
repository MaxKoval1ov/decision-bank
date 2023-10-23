import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { loansService } from '@services/loans.service';
import { useNavigate } from 'react-router-dom';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import './loanForm.css';

interface LoanData {
    loanPeriod: number;
    amount: number;
}

interface LoanResult {
    maxAmount: number;
    creditScore: number;
    suggestion?: string;
    loanPeriod: number;
}

const LoanForm: React.FC = () => {
    const navigate = useNavigate();

    const [loanData, setLoanData] = useState<LoanData>({
        loanPeriod: 12,
        amount: 2000,
    });

    const [result, setResult] = useState<LoanResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoanData({ ...loanData, [name]: Number(value) });
    };

    const handleSliderChange =
        (name: string) => (_event: unknown, value: number | number[]) => {
            setLoanData({ ...loanData, [name]: Number(value) });
        };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setResult(null);

        try {
            const result = await loansService.suggestUserLoan(loanData);
            setResult({ ...result, loanPeriod: loanData.loanPeriod });
        } catch (error) {
            setError(error.response?.data?.message);
        }
    };

    const handleCreate = async () => {
        loansService
            .createUserLoan({
                loanAmount: result!.maxAmount,
                creditScore: result!.creditScore,
                loanPeriod: result!.loanPeriod,
            })
            .then(() => navigate('../profile'))
            .catch(() => {
                // Handle the error here
            });
    };

    return (
        <div className="loan-form-wrapper">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            name="loanPeriod"
                            label="Loan Period"
                            type="number"
                            value={loanData.loanPeriod}
                            onChange={handleInputChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="amount"
                            label="Loan Amount"
                            type="number"
                            value={loanData.amount}
                            onChange={handleInputChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Slider
                            name="loanPeriod"
                            value={loanData.loanPeriod}
                            onChange={handleSliderChange('loanPeriod')}
                            aria-labelledby="loanPeriod-slider"
                            step={1}
                            min={12}
                            max={60}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Slider
                            name="amount"
                            value={loanData.amount}
                            onChange={handleSliderChange('amount')}
                            aria-labelledby="amount-slider"
                            step={1}
                            min={2000}
                            max={10000}
                        />
                    </Grid>
                </Grid>

                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>

            {error && (
                <Typography variant="body2" color="error">
                    {error}
                </Typography>
            )}

            {result && (
                <div className="result-block">
                    <Typography variant="h6">Result:</Typography>
                    <div className="result-details">
                        <Typography variant="body1">
                            Max Amount: {result.maxAmount}
                        </Typography>
                        {/* <Typography variant="body1">
                            Min Amount: {result.minAmount}
                        </Typography> */}
                        <Typography variant="body1">
                            Credit Score: {result.creditScore}
                        </Typography>
                        {result.suggestion && (
                            <Typography variant="body1">
                                Suggestion: {result.suggestion}
                            </Typography>
                        )}
                    </div>
                    <Button
                        onClick={handleCreate}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Create loan
                    </Button>
                </div>
            )}
        </div>
    );
};

export default LoanForm;
