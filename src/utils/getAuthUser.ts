import { supabase } from "@/lib/supabase/server";

export const getAuthUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { user } = session ?? {};
  if (!user) throw new Error("Not authenticated");
  return user;
};
