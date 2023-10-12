"use client";

import Attachment from "@/assets/attachment.svg";
import Send from "@/assets/send.svg";
import Undo from "@/assets/undo.svg";
import { PageHeader } from "@/components/page-header";
import { useAuthUser } from "@/hooks/useAuthUser";
import { ChatKey } from "@/hooks/useChatKey";
import { useDecrypt } from "@/hooks/useDecrypt";
import { logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase/client";
import { useChatContext } from "@/providers/chat-provider";
import { createFileBlob } from "@/utils/createFileBlob";
import { AesEncryption } from "@/utils/encryption";
import { OutputFormat } from "@/utils/encryption/Encryption";
import { readFileData } from "@/utils/readFile";
import clsx from "clsx";
import Image from "next/image";
import { useState, type FormEventHandler } from "react";
import { useDropzone } from "react-dropzone";
import { MessageList } from "./message-list";

interface Props {}
type Component = (props: Props) => JSX.Element;

const aes = new AesEncryption();

type FileJson = {
  payload: string;
  metadata: {
    name: string;
  };
};

export const ChatMessages: Component = () => {
  const [files, setFiles] = useState<File[]>(() => []);

  const user = useAuthUser();
  const {
    jwk,
    getJwk,
    chat: { id: chatId, name },
  } = useChatContext();
  const decryptedChatName = useDecrypt(jwk, name);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: openFilePicker,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: setFiles,
    noClick: true,
    noKeyboard: true,
  });

  const saveFiles = async (chatJwk: ChatKey, messageId: string) => {
    try {
      return Promise.all(
        files.map(async (file) => {
          const data = await readFileData(file);

          const fileJson: FileJson = {
            payload: data,
            metadata: {
              name: file.name,
            },
          };

          const jwe = await aes.encrypt(fileJson, chatJwk, OutputFormat.Json);
          const jweBlob = createFileBlob(jwe);

          const { error } = await supabase.storage
            .from("chat-files")
            .upload(
              `${chatId}/${messageId}/${crypto.randomUUID()}.json`,
              jweBlob,
            );

          if (error) throw error;
        }),
      );
    } catch (e) {
      logger.error(e);
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();

      const chatJwk = getJwk();

      const form = e.currentTarget;
      const formData = new FormData(form);

      const message = formData.get("message")?.toString() ?? "";
      if (!message) return;

      const encryptedMessage = await aes.encrypt(message, chatJwk);

      const { data: dbMessage } = await supabase
        .from("ChatMessages")
        .insert({
          message: encryptedMessage,
          sender_id: user.id,
          chat_id: chatId,
        })
        .select()
        .single();

      if (files.length && dbMessage?.id) {
        await saveFiles(chatJwk, dbMessage.id);
      }

      form.reset();
    } catch (e) {
      logger.error(e);
    }
  };

  const onReset: FormEventHandler<HTMLFormElement> = () => {
    setFiles([]);
  };

  if (decryptedChatName === null) return <></>;
  return (
    <>
      <input {...getInputProps()} />
      <div
        {...getRootProps()}
        className={clsx(
          "h-full flex flex-col justify-between",
          isDragActive &&
            "bg-slate-200 border-dashed border-2 border-gray-500 rounded-md",
        )}
      >
        <PageHeader text={decryptedChatName} />
        <div className="h-max grow p-4">
          <MessageList />
        </div>
        <div className="h-24 bg-white p-4 flex content-center">
          <form
            className="flex flex-row justify-between rounded-md focus:outline-none bg-gray-100 border-gray-300 w-full p-2"
            onSubmit={onSubmit}
            onReset={onReset}
          >
            <input
              name="message"
              type="text"
              placeholder="Type a message..."
              className="bg-transparent border-none focus:outline-none w-max grow"
            />
            <div className="w-30 flex flex-row justify-end px-2 gap-2 border-l-2 border-black-200">
              <button type="button" onClick={openFilePicker}>
                <Image src={Attachment} alt="attach file" />
              </button>
              <button type="reset">
                <Image src={Undo} alt="undo" />
              </button>
              <button type="submit">
                <Image src={Send} alt="send message" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
