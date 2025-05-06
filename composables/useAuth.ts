import { signIn } from "~/utils/api/auth/signIn";
import { signOut } from "~/utils/api/auth/signOut";
import { signUp } from "~/utils/api/auth/signUp";
import { verifyOtp } from "~/utils/api/auth/verifyOtp";
import { getUser } from "~/utils/api/auth/getUser";
import { getUserName } from "~/utils/api/auth/getUserName";

import { sanitizeName } from "~/utils/sanitization/name";
import { validateEmail } from "~/utils/validation/email";
import { validatePassword } from "~/utils/validation/password";
import { validateName } from "~/utils/validation/name";

import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const user = useState<User | null>("auth-user", () => null);

  async function signUpHandler(email: string, password: string, name: string) {
    name = sanitizeName(name);

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const nameValidation = validateName(name);

    if (!nameValidation.valid) {
      alert(nameValidation.errors![0]);
      return false;
    }

    if (!emailValidation.valid) {
      alert(emailValidation.errors![0]);
      return false;
    }

    if (!passwordValidation.valid) {
      alert(passwordValidation.errors![0]);
      return false;
    }

    const { error } = await signUp(email, password, name);

    if (error) {
      alert(error);
      return false;
    }

    return true;
  }

  async function signInHandler(email: string, password: string) {
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (!emailValidation.valid) {
      alert(emailValidation.errors![0]);
      return false;
    }

    if (!passwordValidation.valid) {
      alert(passwordValidation.errors![0]);
      return false;
    }

    const { error } = await signIn(email, password);

    if (error) {
      alert(error);
      return false;
    }

    return true;
  }

  async function signOutHandler() {
    await signOut();
  }

  async function updateUser() {
    const fetchedUser = await getUser();
    user.value = fetchedUser;
    return fetchedUser;
  }

  async function verifyOtpHandler(email: string, token: string, type: string) {
    const { error } = await verifyOtp(email, token, type);

    if (error) {
      alert(error);
      return false;
    }

    return true;
  }

  async function refreshUserAfter(
    action: (...args: any[]) => Promise<any>,
    ...args: any[]
  ) {
    const result = await action(...args);
    await updateUser();
    return result;
  }

  return {
    user,
    signIn: (...args: any[]) => refreshUserAfter(signInHandler, ...args),
    signOut: (...args: any[]) => refreshUserAfter(signOutHandler, ...args),
    signUp: signUpHandler,
    verifyOtp: (...args: any[]) => refreshUserAfter(verifyOtpHandler, ...args),
    getUserName,
    getUser: updateUser,
  };
}
