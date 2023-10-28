import { useAuthContext } from "@/providers/auth-provider";

export const useUserKeys = () => {
  const { publicKey, privateKey } = useAuthContext();
  if (!publicKey || !privateKey) throw new Error("User keys not found");
  return { publicKey, privateKey };
};
