import type { KeyLike } from "jose";
import * as jose from "jose";
import { Encryption } from "./Encryption";

export class RsaEncryption extends Encryption {
  constructor() {
    super("RSA-OAEP", "A256GCM");
  }

  generateKeyPair = () => jose.generateKeyPair(this.alg, { extractable: true });

  exportKeyPair = async (publicKey: KeyLike, privateKey: KeyLike) => {
    const publicJwk = await this.exportKey(publicKey);
    const privateJwk = await this.exportKey(privateKey);
    return {
      publicJwk,
      privateJwk,
    };
  };

  importKeyPair = async (publicJwk: string, privateJwk: string) => {
    const publicKey = await this.importKey(publicJwk);
    const privateKey = await this.importKey(privateJwk);
    return { publicKey, privateKey };
  };
}
