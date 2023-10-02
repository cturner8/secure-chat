import { useChatKey, type ChatKey } from "@/hooks/useChatKey";
import { createCtx } from "@/lib/createCtx";
import type { Chat, ChatMessage } from "@/types/database";
import { useCallback, useMemo, type PropsWithChildren } from "react";

type ChatContext = {
  jwk: ChatKey | null;
  getJwk: () => ChatKey;
  chat: Chat;
  messages: ChatMessage[];
};

type Props = {
  chatKey: string;
  chat: Chat;
  messages: ChatMessage[];
};

const [Provider, useChatContext] = createCtx<ChatContext>("ChatProvider");

export const ChatProvider = ({
  chatKey,
  chat,
  messages,
  children,
}: PropsWithChildren<Props>) => {
  const jwk = useChatKey(chatKey);
  const getJwk = useCallback(() => {
    if (!jwk) throw new Error("Chat key not found");
    return jwk;
  }, [jwk]);
  const value = useMemo<ChatContext>(
    () => ({
      jwk,
      chat,
      messages,
      getJwk,
    }),
    [chat, messages, jwk, getJwk],
  );
  return <Provider value={value}>{children}</Provider>;
};

export { useChatContext };
