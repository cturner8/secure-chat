import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
export const supabase = createServerComponentClient<Database>({
  cookies,
});
