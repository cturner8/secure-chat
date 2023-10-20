import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const getAuthUser = async () => {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { user } = session ?? {};
  if (!user) throw new Error("Not authenticated");
  return user;
};
