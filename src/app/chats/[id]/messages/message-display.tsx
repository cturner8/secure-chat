"use client";

import { useChatContext } from "@/providers/chat-provider";
import type { ChatMessage } from "@/types/database";
import { AesEncryption } from "@/utils/encryption";
import { useEffect, useState } from "react";

interface Props {
  chatMessage: ChatMessage;
}
type Component = (props: Props) => JSX.Element;

const aes = new AesEncryption();

export const MessageDisplay: Component = ({ chatMessage }) => {
  const { id, message } = chatMessage;
  const { jwk } = useChatContext();

  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(
    () => null,
  );

  useEffect(() => {
    if (!message || !jwk) return;
    aes
      .decrypt(message, jwk)
      .then((plaintext) => setDecryptedMessage(plaintext));
  }, [message, jwk]);

  if (decryptedMessage == null) return <></>;
  return <p key={id}>{decryptedMessage}</p>;
};
