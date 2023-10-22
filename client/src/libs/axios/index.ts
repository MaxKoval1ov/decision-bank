import Axios, { AxiosError } from 'axios';
import { redirect } from 'react-router-dom';

import { API_BASE_URL } from '@config';
import { authService } from '@services/auth/auth.service';
import { storage } from '@utils/storage';

export const axios = Axios.create({
    baseURL: API_BASE_URL,
});

axios.interceptors.request.use(
    (config) => {
        const token = storage.getAccessToken();
        // Add the Bearer token to the request headers if a token is available
        if (token) {
            if (!config.headers.has('Authorization')) {
                config.headers.set('Authorization', `Bearer ${token}`);
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;

        if (!originalRequest) return Promise.reject(error);

        if (error.response && error.response.status === 401) {
            const refreshToken = storage.getRefreshToken();

            // If the error is due to an unauthorized (401) response, attempt token refresh
            return authService
                .refreshTokens({ refreshToken })
                .then((token) => {
                    // Retry the original request with the new token
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axios(originalRequest);
                })
                .catch(() => {
                    // If token refresh fails, redirect to the login page
                    redirect('/login'); // Adjust the route as needed
                });
        }

        return Promise.reject(error);
    },
);
