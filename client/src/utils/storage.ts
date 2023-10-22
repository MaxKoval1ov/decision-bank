const storagePrefix = 'baseApi_';

export const storage = {
    getAccessToken: () => {
        const accessToken = window.localStorage.getItem(
            `${storagePrefix}accessToken`,
        );
        return accessToken ? JSON.parse(accessToken) : null;
    },
    setAccessToken: (token: string) => {
        window.localStorage.setItem(
            `${storagePrefix}accessToken`,
            JSON.stringify(token),
        );
    },

    clearAccessToken: () => {
        window.localStorage.removeItem(`${storagePrefix}accessToken`);
    },
    getRefreshToken: () => {
        const refreshToken = window.localStorage.getItem(
            `${storagePrefix}refreshToken`,
        );
        return refreshToken ? JSON.parse(refreshToken) : null;
    },
    setRefreshToken: (token: string) => {
        window.localStorage.setItem(
            `${storagePrefix}refreshToken`,
            JSON.stringify(token),
        );
    },

    clearRefreshToken: () => {
        window.localStorage.removeItem(`${storagePrefix}refreshToken`);
    },
};
