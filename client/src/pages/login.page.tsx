import { API_BASE_URL } from '@config';
import { useAuth } from '@hooks/userAuth.hook';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { LoginResponseDto } from '@types';
import { storage } from '@utils/storage';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { UserModel } from 'models/user.model';

export const LoginPage = () => {
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget) as any;

        // Log in and get the response
        const response = await axios.post<LoginResponseDto>(
            `${API_BASE_URL}/auth/login`,
            {
                username: data.get('username'),
                password: data.get('password'),
            },
        );

        if (response.data.accessToken) {
            // Save the response, including accessToken and refreshToken
            storage.setAccessToken(response.data.accessToken);
            storage.setRefreshToken(response.data.refreshToken);


            const user = jwt_decode(response.data.accessToken) as UserModel;

            if (user && user.username) {
                login({ username: user.username });
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log In
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="User's Name"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
