import { AesEncryption } from "@/utils/encryption";
import type { Key } from "@/utils/encryption/Encryption";
import { useEffect, useState } from "react";
import { useAuthUser } from "./useAuthUser";

const aes = new AesEncryption();

export const useDecrypt = (jwk: Key | null, ciphertext: string | null) => {
  const user = useAuthUser();
  const [plaintext, setPlaintext] = useState<string | null>(() => null);
  useEffect(() => {
    if (!ciphertext || !jwk) return;
    aes
      .decrypt(ciphertext, jwk)
      .then((decryptedPlaintext) => setPlaintext(decryptedPlaintext));
  }, [ciphertext, jwk]);
  useEffect(() => {
    if (!user) {
      setPlaintext(null);
    }
  }, [user]);
  return plaintext;
};
