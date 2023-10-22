import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './App';

const theme = createTheme({
    palette: {
        primary: { main: '#6CDE4F' },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>,
);
