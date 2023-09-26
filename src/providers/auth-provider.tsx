"use client";

import { createCtx } from "@/lib/createCtx";
import { logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase/client";

import type { User } from "@supabase/supabase-js";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";

type AuthContext = {
  user: User | null;
};

const [Provider, useAuthContext] = createCtx<AuthContext>("AuthProvider");

export const AuthProvder = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(() => null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      logger.debug("onAuthStateChange", { event, session });
      if (!session) return;
      setUser(session.user);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContext>(() => ({ user }), [user]);

  return <Provider value={value}>{children}</Provider>;
};

export { useAuthContext };
