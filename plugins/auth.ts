import { StorageUtils } from "@/utils";

const USER_KEY = "auth_user";

export const AuthToken = {
  getUser: <T = unknown>(): T | null => {
    return StorageUtils.local.get(USER_KEY);
  },

  setUser: (user: unknown): void => {
    StorageUtils.local.set(USER_KEY, user);
  },

  clear: (): void => {
    StorageUtils.local.remove(USER_KEY);
  },
};