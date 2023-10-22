import { axios } from '@libs/axios';
import { LoginCredentialsDTO } from '@dto/loginCredential.dto';
import { LoginResponseDto } from '@types';
import { RefreshTokensDTO } from '@dto/refreshTokens.dto';

export const authService = {
    logIn: (data: LoginCredentialsDTO): Promise<LoginResponseDto> => {
        return axios.post('/auth/login', data);
    },

    refreshTokens: (data: RefreshTokensDTO): Promise<RefreshTokensDTO> => {
        return axios.post('/auth/refresh', data);
    },
};
