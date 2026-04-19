import { StorageUtils } from "@/utils";

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const AuthToken = {
    get: (): string | null => {
        return StorageUtils.cookie.get(TOKEN_KEY);
    },

    set: (token: string, days: number = 7): void => {
        StorageUtils.cookie.set(TOKEN_KEY, token, days);
    },

    clear: (): void => {
        StorageUtils.cookie.remove(TOKEN_KEY);
        StorageUtils.local.remove(USER_KEY);
    },

    getUser: (): any => {
        return StorageUtils.local.get(USER_KEY);
    },

    setUser: (user: any): void => {
        StorageUtils.local.set(USER_KEY, user);
    }
};