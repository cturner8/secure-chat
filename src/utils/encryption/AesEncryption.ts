import { Encryption } from "./Encryption";

export class AesEncryption extends Encryption {
  constructor() {
    super("A256GCMKW", "A256GCM");
  }
}
