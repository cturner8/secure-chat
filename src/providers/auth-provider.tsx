"use client";

import { createCtx } from "@/lib/createCtx";
import { logger } from "@/lib/logger";
import { supabase } from "@/lib/supabase/client";
import { getUserKeys, saveUserKeys } from "@/stores/userKeyStore";
import { RsaEncryption } from "@/utils/encryption";

import type { User } from "@supabase/supabase-js";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";

type AuthContext = {
  user: User | null;
  publicKey: CryptoKey | null;
  privateKey: CryptoKey | null;
};

const encryption = new RsaEncryption();

const [Provider, useAuthContext] = createCtx<AuthContext>("AuthProvider");

const saveUserPublicKey = async (user_id: string, publicKey: CryptoKey) => {
  try {
    const publicJwk = await encryption.exportKey(publicKey);
    const { error } = await supabase.from("UserPublicKeys").insert({
      user_id,
      public_key: publicJwk as any,
    });
    if (error) {
      console.error(error);
    }
  } catch (e) {
    console.error(e);
  }
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(() => null);
  const [publicKey, setPublicKey] = useState<CryptoKey | null>(() => null);
  const [privateKey, setPrivateKey] = useState<CryptoKey | null>(() => null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      logger.debug("onAuthStateChange", { event, session });
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
        setPublicKey(null);
        setPrivateKey(null);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    try {
      // try and get the user keys from the store
      getUserKeys(user.id).then((keyPair) => {
        if (keyPair.publicKey && keyPair.privateKey) {
          setPublicKey(keyPair.publicKey);
          setPrivateKey(keyPair.privateKey);
          return;
        }

        // create and save a new keypair
        encryption.generateKeyPair().then((newKeyPair) => {
          setPublicKey(newKeyPair.publicKey);
          setPrivateKey(newKeyPair.privateKey);
          saveUserKeys(user.id, newKeyPair.publicKey, newKeyPair.privateKey);
          saveUserPublicKey(user.id, newKeyPair.publicKey);
        });
      });
    } catch (e) {}
  }, [user]);

  const value = useMemo<AuthContext>(
    () => ({ user, publicKey, privateKey }),
    [user, publicKey, privateKey],
  );

  return <Provider value={value}>{children}</Provider>;
};

export { useAuthContext };
