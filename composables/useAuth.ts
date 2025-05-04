import { signIn } from "~/utils/api/auth/signIn";
import { signOut } from "~/utils/api/auth/signOut";
import { signUp } from "~/utils/api/auth/signUp";
import { verifyOtp } from "~/utils/api/auth/verifyOtp";
import { getUser } from "~/utils/api/auth/getUser";

export function useAuth() {
  return {
    signIn,
    signOut,
    signUp,
    verifyOtp,
    getUser,
  };
}
