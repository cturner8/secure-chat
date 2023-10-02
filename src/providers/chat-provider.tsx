import { useChatKey, type ChatKey } from "@/hooks/useChatKey";
import { createCtx } from "@/lib/createCtx";
import type {
  Chat,
  ChatMemberWithProfile,
  ChatMessage,
} from "@/types/database";
import { useCallback, useMemo, type PropsWithChildren } from "react";

type ChatContext = {
  jwk: ChatKey | null;
  getJwk: () => ChatKey;
  chat: Chat;
  messages: ChatMessage[];
  members: ChatMemberWithProfile[];
};

type Props = {
  chatKey: string;
  chat: Chat;
  messages: ChatMessage[];
  members: ChatMemberWithProfile[];
};

const [Provider, useChatContext] = createCtx<ChatContext>("ChatProvider");

export const ChatProvider = ({
  chatKey,
  chat,
  messages,
  members,
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
      members,
      getJwk,
    }),
    [chat, messages, members, jwk, getJwk],
  );
  return <Provider value={value}>{children}</Provider>;
};

export { useChatContext };
