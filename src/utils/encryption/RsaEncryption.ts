import * as jose from "jose";
import { Encryption } from "./Encryption";

export class RsaEncryption extends Encryption {
  constructor() {
    super("RSA-OAEP", "A256GCM");
  }

  generateKeyPair = () => jose.generateKeyPair<CryptoKey>(this.alg);
}
