import { createClient } from "@supabase/supabase-js";
import type { Database } from "../database.types";
const { NEXT_PUBLIC_SUPABASE_URL, SERVICE_ROLE_KEY } = process.env;
export const supabase = createClient<Database>(
  NEXT_PUBLIC_SUPABASE_URL,
  SERVICE_ROLE_KEY,
);
