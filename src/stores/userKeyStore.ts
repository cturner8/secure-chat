"use client";

import { logger } from "@/lib/logger";
import { DB_NAME, localforage } from "./store";

const userKeyStore = localforage.createInstance({
  name: DB_NAME,
  storeName: "userKeys",
});

export const saveUserKeys = async (
  userId: string,
  publicKey: CryptoKey,
  privateKey: CryptoKey,
) => {
  try {
    await userKeyStore.setItem(`${userId}.public`, publicKey);
    await userKeyStore.setItem(`${userId}.private`, privateKey);
    return Promise.resolve();
  } catch (e) {
    logger.error("Error saving user keys:", e);
    return Promise.reject(e);
  }
};

export const getUserKeys = async (userId: string) => {
  try {
    const publicKey = await userKeyStore.getItem<CryptoKey>(`${userId}.public`);
    const privateKey = await userKeyStore.getItem<CryptoKey>(
      `${userId}.private`,
    );
    return Promise.resolve({ publicKey, privateKey });
  } catch (e) {
    logger.error("Error getting user keys:", e);
    return Promise.reject(e);
  }
};
