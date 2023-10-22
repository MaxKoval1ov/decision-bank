const storagePrefix = 'baseApi_';

export const storage = {
    getAccessToken: () => {
        return window.localStorage.getItem(
            `${storagePrefix}accessToken`,
        ) as string;
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
        return window.localStorage.getItem(
            `${storagePrefix}refreshToken`,
        ) as string;
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
