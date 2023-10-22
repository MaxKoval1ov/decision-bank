import { Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from '@hooks/userAuth.hook';
import { Header } from '@components/header/header.component';

export const ProtectedLayout = () => {
    const { user } = useAuth();
    const outlet = useOutlet();

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Header
                pages={[
                    { label: 'Settings', path: 'settings' },
                    { label: 'Profile', path: 'profile' },
                ]}
            />
            {outlet}
        </div>
    );
};
