import { supabase } from "@/lib/supabase/server";
import type { JWK } from "jose";
import { AesEncryption } from "./encryption";

const aes = new AesEncryption();

export const dynamic = "force-dynamic";

export const getUserPublicKey = async (userId: string) => {
  const { data, error } = await supabase
    .from("UserPublicKeys")
    .select("public_key")
    .eq("user_id", userId)
    .single();
  if (error) return Promise.reject(error);
  const { public_key } = data ?? {};

  return aes.importKey(public_key as JWK);
};
