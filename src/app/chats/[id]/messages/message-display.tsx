"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import { useChatContext } from "@/providers/chat-provider";
import type { ChatMessage } from "@/types/database";
import { AesEncryption } from "@/utils/encryption";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

interface Props {
  chatMessage: ChatMessage;
}
type Component = (props: Props) => JSX.Element;

const aes = new AesEncryption();

export const MessageDisplay: Component = ({ chatMessage }) => {
  const { id, message, sender_id } = chatMessage;
  const { jwk } = useChatContext();
  const user = useAuthUser();

  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(
    () => null,
  );

  const isSender = useMemo(() => sender_id === user.id, [sender_id, user.id]);

  useEffect(() => {
    if (!message || !jwk) return;
    aes
      .decrypt(message, jwk)
      .then((plaintext) => setDecryptedMessage(plaintext));
  }, [message, jwk]);

  if (decryptedMessage == null) return <></>;
  return (
    <p
      key={id}
      className={clsx(
        isSender ? "text-right" : "text-left",
        "border border-white p-4 rounded-md",
        isSender && "border-secondary",
      )}
    >
      {decryptedMessage}
    </p>
  );
};
