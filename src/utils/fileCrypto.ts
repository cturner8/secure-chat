import type { ChatKey } from "@/hooks/useChatKey";
import { logger } from "@/lib/logger";
import type { GeneralJWE } from "jose";
import { createFileBlob } from "./createFileBlob";
import { AesEncryption } from "./encryption";
import { OutputFormat } from "./encryption/Encryption";
import { readFileData } from "./readFile";

export type FileJson = {
  payload: string;
  metadata: {
    name: string;
  };
};

const aes = new AesEncryption();

export const encryptFile = async (jwk: ChatKey, file: File) => {
  try {
    const data = await readFileData(file);

    const fileJson: FileJson = {
      payload: data,
      metadata: {
        name: file.name,
      },
    };

    const jwe = await aes.encrypt(fileJson, jwk, OutputFormat.Json);
    const blob = createFileBlob(jwe);

    const path = `${crypto.randomUUID()}.json`;

    return Promise.resolve({
      blob,
      path,
    });
  } catch (e) {
    logger.error(e);
    return Promise.reject(e);
  }
};

export const decryptFile = async (jwk: ChatKey, file: Blob) => {
  try {
    const cipher = await file.text();
    const jwe = JSON.parse(cipher) as GeneralJWE;

    const decrypted = await aes.decrypt(jwe, jwk, OutputFormat.Json);

    return Promise.resolve<FileJson>(decrypted as FileJson);
  } catch (e) {
    logger.error(e);
    return Promise.reject(e);
  }
};
