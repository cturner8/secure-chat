"use client";

import { createCtx } from "@/lib/createCtx";

import type { Session } from "@supabase/supabase-js";

type AuthContext = {
  session: Session;
};

export const [AuthProvider, useAuthContext] =
  createCtx<AuthContext>("AuthProvider");
