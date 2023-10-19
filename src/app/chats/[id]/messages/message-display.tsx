"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import { useChatMessageFiles } from "@/hooks/useChatMessageFiles";
import { useDecrypt } from "@/hooks/useDecrypt";
import { useChatContext } from "@/providers/chat-provider";
import type {
  ChatMemberWithProfile,
  ChatMessageWithFiles,
} from "@/types/database";
import clsx from "clsx";
import Image from "next/image";
import { useMemo } from "react";

interface Props {
  chatMessage: ChatMessageWithFiles;
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
  const [file] = useChatMessageFiles(jwk, chatMessage);

  const isSender = useMemo(() => sender_id === user.id, [sender_id, user.id]);

  if (decryptedMessage === null && !file) return <></>;

  return (
    <>
      {!isSender && <p>{displaySender(sender_id, members)}</p>}
      <div
        key={id}
        className={clsx(
          // isSender ? "text-right" : "text-left",
          "flex flex-col w-full",
          isSender ? "justify-end" : "justify-start", // todo
          "p-4 rounded-md",
          isSender ? "bg-primary" : "bg-white",
        )}
      >
        {decryptedMessage}
        {file ? (
          <Image
            className="aspect-auto"
            src={file.payload}
            alt={file.metadata.name}
            height={250} // todo
            width={250} // todo
          />
        ) : null}
      </div>
    </>
  );
};
