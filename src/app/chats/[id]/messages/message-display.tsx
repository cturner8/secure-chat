"use client";

import ImageIcon from "@/assets/image.svg";
import { LightboxImage } from "@/components/lightbox-image";
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
import { useMemo, useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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
  const files = useChatMessageFiles(jwk, chatMessage);

  const [filePreviewOpen, setFilePreviewOpen] = useState(() => false);
  const [selectedFileIndex, setSelectedFileIndex] = useState(() => -1);

  const isSender = useMemo(() => sender_id === user.id, [sender_id, user.id]);

  if (decryptedMessage === null && !files.length) return <></>;

  const handleSelectFile = (fileIndex: number) => () => {
    setSelectedFileIndex(fileIndex);
    setFilePreviewOpen(true);
  };

  const handleCloseLightbox = () => {
    setFilePreviewOpen(false);
    setSelectedFileIndex(-1);
  };

  return (
    <>
      {!isSender && <p>{displaySender(sender_id, members)}</p>}
      {files ? (
        <Lightbox
          index={selectedFileIndex}
          slides={files.map((file) => ({
            src: file.payload,
            alt: file.metadata.name,
          }))}
          open={filePreviewOpen}
          close={handleCloseLightbox}
          render={{ slide: LightboxImage }}
        />
      ) : null}
      <div
        key={id}
        className={clsx(
          "flex flex-col flex-wrap w-full justify-start gap-1",
          isSender ? "content-end items-end" : "content-start items-start",
          "p-4 rounded-md",
          isSender ? "bg-primary" : "bg-white",
        )}
      >
        <span>{decryptedMessage}</span>
        {files.map((file, fileIndex) => (
          <span
            key={`${file.metadata.name}-${fileIndex}`}
            className="flex flex-row gap-1"
            onClick={handleSelectFile(fileIndex)}
          >
            <Image src={ImageIcon} alt="image icon" />
            {file.metadata.name}
          </span>
        ))}
      </div>
    </>
  );
};
