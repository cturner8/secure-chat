"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import { useDecrypt } from "@/hooks/useDecrypt";
import { useChatContext } from "@/providers/chat-provider";
import type { ChatMemberWithProfile, ChatMessage } from "@/types/database";
import clsx from "clsx";
import { useMemo } from "react";

interface Props {
  chatMessage: ChatMessage;
}
type Component = (props: Props) => JSX.Element;

const displaySender = (
  senderId: string | null,
  members: ChatMemberWithProfile[],
) => {
  const sender = members.find((member) => member.user_id === senderId);
  if (!sender) return "";
  return sender.profile.email;
};

export const MessageDisplay: Component = ({ chatMessage }) => {
  const { id, message, sender_id } = chatMessage;
  const { jwk, members } = useChatContext();
  const user = useAuthUser();

  const decryptedMessage = useDecrypt(jwk, message);

  const isSender = useMemo(() => sender_id === user.id, [sender_id, user.id]);

  if (decryptedMessage == null) return <></>;
  return (
    <>
      {!isSender && <p>{displaySender(sender_id, members)}</p>}
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
