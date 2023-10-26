import { supabase } from "@/lib/supabase/client";
import { useChatContext } from "@/providers/chat-provider";
import type {
  ChatMessage,
  ChatMessageFiles,
  ChatMessageWithFiles,
} from "@/types/database";
import { useEffect, useState } from "react";

export const useChatMessages = () => {
  const { chat, messages } = useChatContext();
  const [chatMessages, setChatMessages] = useState(() => messages);
  useEffect(() => {
    const channel = supabase
      .channel("any")
      .on<ChatMessage>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ChatMessages",
          filter: `chat_id=eq.${chat.id}`,
        },
        (payload) => {
          if (!("id" in payload.new)) return;
          const newMessage: ChatMessageWithFiles = {
            ...payload.new,
            files: [],
          };
          setChatMessages((prev) => [...prev, newMessage]);
        },
      )
      .on<ChatMessageFiles>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ChatMessageFiles",
          filter: `chat_id=eq.${chat.id}`,
        },
        (payload) => {
          if (!("id" in payload.new)) return;
          const { id, message_id, path } = payload.new;
          setChatMessages((prev) =>
            prev.map((prevMessage) => {
              if (prevMessage.id !== message_id) return prevMessage;
              return {
                ...prevMessage,
                files: [
                  ...prevMessage.files,
                  {
                    id,
                    path,
                  },
                ],
              };
            }),
          );
        },
      );
    channel.subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [chat.id]);
  return chatMessages;
};
