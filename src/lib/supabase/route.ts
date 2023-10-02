import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
export const supabase = createRouteHandlerClient<Database>({
  cookies,
});
