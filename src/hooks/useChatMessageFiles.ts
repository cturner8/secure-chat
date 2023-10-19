import { logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase/client";
import type { ChatMessageWithFiles } from "@/types/database";
import { decryptFile, type FileJson } from "@/utils/fileCrypto";
import { useEffect, useState } from "react";
import type { ChatKey } from "./useChatKey";

const getMessageFiles = async (jwk: ChatKey, message: ChatMessageWithFiles) => {
  try {
    const blobs = await Promise.all(
      message.files.map(({ path }) =>
        supabase.storage
          .from("chat-files")
          .download(`${message.chat_id}/${message.id}/${path}`)
          .then(({ data, error }) => (error ? Promise.reject(error) : data)),
      ),
    );
    const decrypted = await Promise.all(
      blobs.map((blob) => decryptFile(jwk, blob)),
    );

    return Promise.resolve(decrypted);
  } catch (e) {
    logger.error(e);
    return Promise.reject(e);
  }
};

export const useChatMessageFiles = (
  jwk: ChatKey | null,
  message: ChatMessageWithFiles,
) => {
  const [files, setFiles] = useState<FileJson[]>(() => []);
  useEffect(() => {
    if (!jwk) return;
    getMessageFiles(jwk, message)
      .then(setFiles)
      .catch((e) => logger.error(e));
  }, [message, jwk]);
  return files;
};
