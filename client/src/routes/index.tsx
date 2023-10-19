import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '@pages/login.page';
import { ErrorPage } from '@pages/error.page';
import { Root } from './root';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
        errorElement: <ErrorPage />,
    },
]);
