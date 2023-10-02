import type { Database } from "@/lib/database.types";

export type Chat = Database["public"]["Tables"]["Chats"]["Row"];
export type ChatMessage = Database["public"]["Tables"]["ChatMessages"]["Row"];
