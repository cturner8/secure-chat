import { AesEncryption, RsaEncryption } from "@/utils/encryption";
import { useEffect, useState } from "react";
import { useAuthUser } from "./useAuthUser";
import { useUserKeys } from "./userUserKeys";

const aes = new AesEncryption();
const rsa = new RsaEncryption();

export type ChatKey = CryptoKey | Uint8Array;

export const useChatKey = (chatKey: string) => {
  const user = useAuthUser();
  const { privateKey } = useUserKeys();
  const [jwk, setJwk] = useState<ChatKey | null>(() => null);
  useEffect(() => {
    rsa.decrypt(chatKey, privateKey).then((decryptedChatKey) => {
      aes.importKey(decryptedChatKey).then((decryptedJwk) => {
        setJwk(decryptedJwk);
      });
    });
  }, [chatKey, privateKey]);
  useEffect(() => {
    if (!user) {
      setJwk(null);
    }
  }, [user]);
  return jwk;
};
