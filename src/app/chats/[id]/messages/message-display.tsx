"use client";

import type { ChatKey } from "@/hooks/useChatKey";
import type { ChatMessage } from "@/types/database";
import { AesEncryption } from "@/utils/encryption";
import { useEffect, useState } from "react";

interface Props {
  jwk: ChatKey;
  chatMessage: ChatMessage;
}
type Component = (props: Props) => JSX.Element;

const aes = new AesEncryption();

export const MessageDisplay: Component = ({ jwk, chatMessage }) => {
  const { id, message } = chatMessage;

  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(
    () => null,
  );

  useEffect(() => {
    if (!message) return;
    aes
      .decrypt(message, jwk)
      .then((plaintext) => setDecryptedMessage(plaintext));
  }, [message, jwk]);

  if (decryptedMessage == null) return <></>;
  return <p key={id}>{decryptedMessage}</p>;
};
