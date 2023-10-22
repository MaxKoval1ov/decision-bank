import { useAuth } from '@hooks/userAuth.hook';
import { Navigate, useOutlet } from 'react-router-dom';
import { Header } from './header/header.component';

export const HomeLayout = () => {
    const { user } = useAuth();
    const outlet = useOutlet();

    if (user) {
        return <Navigate to="/dashboard/profile" replace />;
    }

    return (
        <div>
            <Header
                pages={[
                    { label: 'Home', path: '/' },
                    { label: 'Login', path: '/login' },
                ]}
            />
            {outlet}
        </div>
    );
};
