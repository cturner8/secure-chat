import { AesEncryption } from "@/utils/encryption";
import type { Key } from "@/utils/encryption/Encryption";
import { useEffect, useState } from "react";

const aes = new AesEncryption();

export const useDecrypt = (jwk: Key | null, ciphertext: string | null) => {
  const [plaintext, setPlaintext] = useState<string | null>(() => null);
  useEffect(() => {
    if (!ciphertext || !jwk) return;
    aes
      .decrypt(ciphertext, jwk)
      .then((decryptedPlaintext) => setPlaintext(decryptedPlaintext));
  }, [ciphertext, jwk]);
  return plaintext;
};
