import type { GeneralJWS } from "jose";
import * as jose from "jose";
import { Encryption, type Key } from "./Encryption";

type SignedEncryptResult = {
  jwe: string;
  jws: string;
  encoded: string;
};

export class RsaEncryption extends Encryption {
  private signAlg: string;

  constructor() {
    super("RSA-OAEP", "A256GCM");
    this.signAlg = "PS256";
  }

  generateKeyPair = (extractable = false) =>
    jose.generateKeyPair<CryptoKey>(this.alg, { extractable });

  generateSigningKeyPair = () => jose.generateKeyPair<CryptoKey>(this.signAlg);

  public sign = async (plaintext: string, key: Key): Promise<string> => {
    const jws = await new jose.GeneralSign(new TextEncoder().encode(plaintext))
      .addSignature(key)
      .setProtectedHeader({ alg: this.signAlg })
      .sign();
    const outputJws = this.toBase64(jws);

    return outputJws;
  };

  public verify = async (outputJws: string, key: Key): Promise<void> => {
    const jws = this.fromBase64<GeneralJWS>(outputJws);
    await jose.generalVerify(jws, key);
  };

  public signedEncrypt = async (
    plaintext: string,
    publicKey: Key,
    privateSigningKey: Key,
  ): Promise<SignedEncryptResult> => {
    const jwe = await this.encrypt(plaintext, publicKey);
    const jws = await this.sign(plaintext, privateSigningKey);
    const encoded = `${jwe}.${jws}`;
    return {
      jwe,
      jws,
      encoded,
    };
  };

  public verifiedDecrypt = async (
    encoded: string,
    privateKey: Key,
    publicSigningKey: Key,
  ): Promise<string> => {
    const [jwe, jws] = encoded.split(".");
    await this.verify(jws, publicSigningKey);
    const plaintext = await this.decrypt(jwe, privateKey);
    return plaintext;
  };
}
