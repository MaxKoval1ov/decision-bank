import React, { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage.hook';

export interface IUserData {
    username: string;
}

export interface IAuthProvider {
    children: React.ReactNode;
    userData: IUserData;
}

type AuthContextType = {
    user: IUserData | null;
    login: (data: IUserData) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<IAuthProvider> = ({
    children,
    userData,
}: IAuthProvider) => {
    const [user, setUser] = useLocalStorage<IUserData>('user', userData);
    const navigate = useNavigate();

    const login = async (data: IUserData) => {
        setUser(data);
        navigate('/dashboard/profile', { replace: true });
    };

    const logout = () => {
        setUser(null);
        navigate('/', { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
        }),
        [user],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
