import type { Database } from "@/lib/database.types";

export type UserProfile = Database["public"]["Tables"]["UserProfiles"]["Row"];
export type UserChatKey = Database["public"]["Tables"]["UserChatKeys"]["Row"];
export type Chat = Database["public"]["Tables"]["Chats"]["Row"];
export type ChatWithKey = Chat & {
  chatKey: Array<Pick<UserChatKey, "key">>;
};
export type ChatMessage = Database["public"]["Tables"]["ChatMessages"]["Row"];
export type ChatMessageWithSender = ChatMessage & {
  sender: Pick<UserProfile, "email" | "firstname" | "lastname">;
};
