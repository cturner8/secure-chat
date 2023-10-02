import { supabase } from "@/lib/supabase/client";
import { useChatContext } from "@/providers/chat-provider";
import type { ChatMessage } from "@/types/database";
import { useEffect, useState } from "react";

export const useChatMessages = () => {
  const { chat, messages } = useChatContext();
  const [chatMessages, setChatMessages] = useState(() => messages);
  useEffect(() => {
    const channel = supabase.channel("any").on<ChatMessage>(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "ChatMessages",
        filter: `chat_id=eq.${chat.id}`,
      },
      (payload) => {
        if (!("id" in payload.new)) return;
        const newMessage: ChatMessage = {
          ...payload.new,
        };
        setChatMessages((prev) => [...prev, newMessage]);
      },
    );
    channel.subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [chat.id]);
  return chatMessages;
};
