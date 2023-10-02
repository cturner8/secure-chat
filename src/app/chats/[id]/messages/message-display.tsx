"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import { useDecrypt } from "@/hooks/useDecrypt";
import { useChatContext } from "@/providers/chat-provider";
import type { ChatMessageWithSender } from "@/types/database";
import clsx from "clsx";
import { useMemo } from "react";

interface Props {
  chatMessage: ChatMessageWithSender;
}
type Component = (props: Props) => JSX.Element;

export const MessageDisplay: Component = ({ chatMessage }) => {
  const { id, message, sender_id, sender } = chatMessage;
  const { jwk } = useChatContext();
  const user = useAuthUser();

  const decryptedMessage = useDecrypt(jwk, message);

  const isSender = useMemo(() => sender_id === user.id, [sender_id, user.id]);

  if (decryptedMessage == null) return <></>;
  return (
    <>
      {!isSender && <p>{sender.email}</p>}
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
    </>
  );
};
