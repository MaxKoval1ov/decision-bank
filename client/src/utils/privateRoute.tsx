import { storage } from '@utils/storage';
import { redirect } from 'react-router-dom';

export interface ProtectedRouteProps {
    authenticationPath: string;
    outlet: JSX.Element;
}

export const PrivateRoute = ({
    outlet,
    authenticationPath,
}: ProtectedRouteProps) => {
    const token = storage.getAccessToken();

    if (!token) redirect(authenticationPath);

    return outlet;
};
