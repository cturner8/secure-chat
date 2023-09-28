import type { GeneralJWE, JWK, KeyLike } from "jose";
import * as jose from "jose";

export type Key = KeyLike | Uint8Array;

export class Encryption {
  constructor(protected alg: string, protected enc: string) {}

  private toBase64 = (input: object) => btoa(JSON.stringify(input));

  private fromBase64 = <O extends object>(input: string) =>
    JSON.parse(atob(input)) as O;

  generateKey = async () =>
    jose.generateSecret(this.alg, { extractable: true });

  encrypt = async (plaintext: string, key: Key): Promise<string> => {
    const jwe = await new jose.GeneralEncrypt(
      new TextEncoder().encode(plaintext),
    )
      .setProtectedHeader({ enc: this.enc })
      .addRecipient(key)
      .setUnprotectedHeader({ alg: this.alg })
      .encrypt();
    const outputJwe = this.toBase64(jwe);

    return outputJwe;
  };

  decrypt = async (outputJwe: string, key: Key): Promise<string> => {
    const jwe = this.fromBase64<GeneralJWE>(outputJwe);
    const decrypted = await jose.generalDecrypt(jwe, key);
    const decoder = new TextDecoder();

    const plaintext = decoder.decode(decrypted.plaintext);
    return plaintext;
  };

  exportKey = async (key: Key) => {
    const jwk = await jose.exportJWK(key);
    return this.toBase64(jwk);
  };

  importKey = async (jwkString: string) => {
    const jwk = this.fromBase64<JWK>(jwkString);
    const key = await jose.importJWK(jwk, this.alg);
    return key;
  };
}
