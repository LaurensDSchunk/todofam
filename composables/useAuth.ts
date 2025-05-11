import type { User } from "~/types/auth.types";
import type {
  SignInRouteInterface,
  SignUpRouteInterface,
  VerifyRouteInterface,
  SignOutRouteInterface,
  ResendOtpRouteInterface,
} from "~/types/api/auth.types";
import {
  SignInRequestSchema,
  SignUpRequestSchema,
  VerifyOtpRequestSchema,
  ResendOtpRequestSchema,
} from "~/types/api/auth.types";
import { apiRequest, validatedApiRequest } from "~/utils/api/apiRequest";

export function useAuth() {
  const user = useState<User | null>("auth-user", () => null);

  async function signIn(
    email: string,
    password: string,
  ): Promise<{ success: boolean }> {
    const { error } = await validatedApiRequest<SignInRouteInterface>(
      "/auth/sign-in",
      "POST",
      SignInRequestSchema,
      { email, password },
    );

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
    const { error } = await validatedApiRequest<SignUpRouteInterface>(
      "/auth/sign-up",
      "POST",
      SignUpRequestSchema,
      { email, name, password },
    );

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
    const { error } = await validatedApiRequest<VerifyRouteInterface>(
      "/auth/verify",
      "POST",
      VerifyOtpRequestSchema,
      { email, token, type },
    );

    if (error) {
      alert(error.message);
      return { success: false };
    }

    return { success: true };
  }

  async function signOut(): Promise<{ success: boolean }> {
    const { error } = await apiRequest<SignOutRouteInterface>(
      "/auth/sign-out",
      "POST",
    );

    if (error) {
      alert(error.message);
      return { success: false };
    }

    return { success: true };
  }

  // Gets the user and fills the user state
  async function getUser(id?: string): Promise<User | null> {
    const { data, error } = await apiRequest<User | null>(
      `/users/${id ? id : "me"}`,
      "GET",
    );

    if (error) {
      alert(error.message);
      return null;
    }

    if (!id) {
      user.value = data;
    }

    return data;
  }

  async function resendOtp(
    email: string,
    type: "signup",
  ): Promise<{ success: boolean }> {
    const { error } = await validatedApiRequest<ResendOtpRouteInterface>(
      "/auth/resend",
      "POST",
      ResendOtpRequestSchema,
      { email, type },
    );

    if (error) {
      alert(error.message);
      return { success: false };
    }

    return { success: true };
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
    resendOtp,
  };
}
