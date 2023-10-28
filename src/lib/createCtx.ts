"use client";

import { createContext, useContext } from "react";

export const createCtx = <C>(providerName: string) => {
  const Context = createContext<C | null>(null);
  const useCtx = () => {
    const value = useContext(Context);
    if (!value) throw new Error(`${providerName} provider is required.`);
    return value;
  };
  return [Context.Provider, useCtx] as const;
};
