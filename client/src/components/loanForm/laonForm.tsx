import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { loansService } from '@services/loans.service';
import { useState } from 'react';
import './loanForm.css';
import { useNavigate } from 'react-router-dom';

const LoanForm = () => {
    const navigate = useNavigate();

    const [loanData, setLoanData] = useState({
        loanPeriod: 12,
        amount: 2000,
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoanData({ ...loanData, [name]: value });
    };

    const handleSliderChange = (name) => (event, value) => {
        setLoanData({ ...loanData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setResult(null);

        try {
            const result = await loansService.suggestUserLoan(loanData);
            setResult({ ...result, loanPeriod: loanData.loanPeriod });
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const handleCreate = async () => {
        loansService
            .createUserLoan({
                loanAmount: result.maxAmount,
                creditScore: result.creditScore,
                loanPeriod: result.loanPeriod,
            })
            .then(() => navigate('../profile'))
            .catch(() => {
                // console.log(err);
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
