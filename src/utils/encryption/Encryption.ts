import type { GeneralJWE, JWK } from "jose";
import * as jose from "jose";

export type Key = CryptoKey | Uint8Array;

export class Encryption {
  constructor(protected alg: string, protected enc: string) {}

  public toBase64 = (input: object) => btoa(JSON.stringify(input));

  public fromBase64 = <O extends object>(input: string) =>
    JSON.parse(atob(input)) as O;

  public generateKey = async () =>
    jose.generateSecret<CryptoKey>(this.alg, { extractable: true });

  public encrypt = async (plaintext: string, key: Key): Promise<string> => {
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

  public decrypt = async (outputJwe: string, key: Key): Promise<string> => {
    const jwe = this.fromBase64<GeneralJWE>(outputJwe);
    const decrypted = await jose.generalDecrypt(jwe, key);
    const decoder = new TextDecoder();

    const plaintext = decoder.decode(decrypted.plaintext);
    return plaintext;
  };

  public exportKey = async (key: Key) => {
    return jose.exportJWK(key);
  };

  public importKey = async (key: JWK | string) => {
    const jwk = typeof key === "string" ? this.fromBase64<JWK>(key) : key;
    return jose.importJWK<CryptoKey>(jwk, this.alg);
  };
}
