import type { User } from "~/types/auth.types";
import {
  SignInRequestSchema,
  SignUpRequestSchema,
  VerifyOtpRequestSchema,
} from "~/types/auth.types";
import { apiRequest } from "~/utils/api/apiRequest";

export function useAuth() {
  const user = useState<User | null>("auth-user", () => null);

  async function signIn(
    email: string,
    password: string,
  ): Promise<{ success: boolean }> {
    const result = SignInRequestSchema.safeParse({ email, password });
    if (!result.success) {
      alert(result.error.message);
      return { success: false };
    }

    const { error } = await apiRequest("/auth/sign-in", "POST", result.data);

    if (error) {
      alert(error.message);
      return { success: false };
    }

    return { success: true };
  }

  async function signUp(
    email: string,
    password: string,
    name: string,
  ): Promise<{ success: boolean }> {
    const result = SignUpRequestSchema.safeParse({ email, password, name });
    if (!result.success) {
      alert(result.error.message);
      return { success: false };
    }

    const { error } = await apiRequest("/auth/sign-up", "POST", result.data);

    if (error) {
      alert(error.message);
      return { success: false };
    }

    return { success: true };
  }

  async function verifyOtp(
    email: string,
    token: string,
    type: "signup",
  ): Promise<{ success: boolean }> {
    const result = VerifyOtpRequestSchema.safeParse({ email, token, type });
    if (!result.success) {
      alert(result.error.message);
      return { success: false };
    }

    const { error } = await apiRequest("/auth/verify", "POST", result.data);

    if (error) {
      alert(error.message);
      return { success: false };
    }

    return { success: true };
  }

  async function signOut(): Promise<{ success: boolean }> {
    const { error } = await apiRequest("/auth/sign-out", "POST");

    if (error) {
      alert(error.message);
      return { success: false };
    }

    return { success: true };
  }

  // Gets the user and fills the user state
  async function getUser(): Promise<User | null> {
    const { data, error } = await apiRequest<User | null>("/users/me", "GET");

    if (error) {
      alert(error.message);
      return null;
    }

    user.value = data;
    return data;
  }

  async function withUserRefresh(
    action: (...args: any[]) => Promise<any>,
    ...args: any[]
  ) {
    const result = await action(...args);
    await getUser();
    return result;
  }

  return {
    user,
    signIn: (...args: any[]) => withUserRefresh(signIn, ...args),
    signOut: (...args: any[]) => withUserRefresh(signOut, ...args),
    signUp,
    verifyOtp: (...args: any[]) => withUserRefresh(verifyOtp, ...args),
    getUser,
  };
}
