import type { Database } from "@/lib/database.types";

export type UserProfile = Database["public"]["Tables"]["UserProfiles"]["Row"];
export type UserChatKey = Database["public"]["Tables"]["UserChatKeys"]["Row"];
export type Chat = Database["public"]["Tables"]["Chats"]["Row"];
export type ChatWithKey = Chat & {
  chatKey: Array<Pick<UserChatKey, "key">>;
};
export type ChatMessage = Database["public"]["Tables"]["ChatMessages"]["Row"];
export type ChatMessageFiles =
  Database["public"]["Tables"]["ChatMessageFiles"]["Row"];
export type ChatMessageWithFiles = ChatMessage & {
  files: Array<Pick<ChatMessageFiles, "path">>;
};
export type ChatMessageWithSender = ChatMessage & {
  sender: Pick<UserProfile, "email" | "firstname" | "lastname">;
};
export type ChatMember = Database["public"]["Tables"]["ChatMembers"]["Row"];
export type ChatMemberWithProfile = Pick<ChatMember, "user_id"> & {
  profile: Pick<UserProfile, "email" | "firstname" | "lastname">;
};
