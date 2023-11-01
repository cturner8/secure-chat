import type { GeneralJWE, JWK } from "jose";
import * as jose from "jose";

export type Key = CryptoKey | Uint8Array;

export enum OutputFormat {
  Base64,
  Json,
}

export class Encryption {
  constructor(protected alg: string, protected enc: string) {}

  public toBase64 = (input: object) => btoa(JSON.stringify(input));

  public fromBase64 = <O extends object>(input: string) =>
    JSON.parse(atob(input)) as O;

  public generateKey = async () =>
    jose.generateSecret<CryptoKey>(this.alg, { extractable: true });

  public encrypt(input: string | object, key: Key): Promise<string>;
  public encrypt(
    input: string | object,
    key: Key,
    format: OutputFormat.Base64,
  ): Promise<string>;
  public encrypt(
    input: string | object,
    key: Key,
    format: OutputFormat.Json,
  ): Promise<GeneralJWE>;
  public async encrypt(
    input: string | object,
    key: Key,
    format: OutputFormat = OutputFormat.Base64,
  ): Promise<string | GeneralJWE> {
    const plaintext = typeof input === "string" ? input : this.toBase64(input);
    const jwe = await new jose.GeneralEncrypt(
      new TextEncoder().encode(plaintext),
    )
      .setProtectedHeader({ enc: this.enc })
      .addRecipient(key)
      .setUnprotectedHeader({ alg: this.alg })
      .encrypt();

    switch (format) {
      case OutputFormat.Base64:
        return this.toBase64(jwe);
      case OutputFormat.Json:
      default:
        return jwe;
    }
  }

  public async decrypt(
    outputJwe: string | GeneralJWE,
    key: Key,
  ): Promise<string>;
  public async decrypt(
    outputJwe: string | GeneralJWE,
    key: Key,
    format: OutputFormat.Base64,
  ): Promise<string>;
  public async decrypt(
    outputJwe: string | GeneralJWE,
    key: Key,
    format: OutputFormat.Json,
  ): Promise<object>;
  public async decrypt(
    outputJwe: string | GeneralJWE,
    key: Key,
    format: OutputFormat = OutputFormat.Base64,
  ): Promise<string | object> {
    const jwe =
      typeof outputJwe === "string"
        ? this.fromBase64<GeneralJWE>(outputJwe)
        : outputJwe;
    const decrypted = await jose.generalDecrypt(jwe, key);
    const decoder = new TextDecoder();

    const plaintext = decoder.decode(decrypted.plaintext);

    switch (format) {
      case OutputFormat.Json:
        return this.fromBase64(plaintext);
      case OutputFormat.Base64:
      default:
        return plaintext;
    }
  }

  public exportKey = async (key: Key) => {
    return jose.exportJWK(key);
  };

  public importKey = async (key: JWK | string, ext = false) => {
    const jwk = typeof key === "string" ? this.fromBase64<JWK>(key) : key;
    return jose.importJWK<CryptoKey>({ ...jwk, ext }, this.alg);
  };
}
