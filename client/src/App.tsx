import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    defer,
} from 'react-router-dom';

// import './styles.css';
import { AuthLayout } from '@components/authLayout';
import { HomeLayout } from '@components/homelayout';
import { ProtectedLayout } from '@components/protecteLayout';
import { HomePage } from '@pages/home.page';
import { LoginPage } from '@pages/login.page';
import { ProfilePage } from '@pages/profile.page';
import { LoanPage } from '@pages/loan.page';

const getUserData = () =>
    new Promise((resolve) =>
        setTimeout(() => {
            // const token = storage.getAccessToken();

            // if (!token) reject('Smth wrong');

            // resolve({ userPromise: jwt.decode(token) });

            // const payload = d.resolve(user);

            const user = window.localStorage.getItem('user');
            resolve(user);
        }, 0),
    );

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            element={<AuthLayout />}
            loader={() => defer({ userPromise: getUserData() })}
        >
            <Route element={<HomeLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route path="/dashboard" element={<ProtectedLayout />}>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<LoanPage />} />
            </Route>
        </Route>,
    ),
);
