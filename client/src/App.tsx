import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    defer,
} from 'react-router-dom';

// import './styles.css';
import { AuthLayout } from '@components/authLayout';
import { ProtectedLayout } from '@components/protecteLayout';
import { HomePage } from '@pages/home.page';
import { LoginPage } from '@pages/login.page';
import { ProfilePage } from '@pages/profile.page';
import { SettingsPage } from '@pages/settings.page';
import { HomeLayout } from '@components/homelayout';

// ideally this would be an API call to server to get logged in user data

const getUserData = () =>
    new Promise((resolve) =>
        setTimeout(() => {
            const user = window.localStorage.getItem('user');
            resolve(user);
        }, 3000),
    );

// for error
// const getUserData = () =>
//   new Promise((resolve, reject) =>
//     setTimeout(() => {
//       reject("Error");
//     }, 3000)
//   );

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
                <Route path="settings" element={<SettingsPage />} />
            </Route>
        </Route>,
    ),
);
