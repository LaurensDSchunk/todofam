import type { User } from "~/types/auth.types";
import type {
  SignInRouteInterface,
  SignUpRouteInterface,
  VerifyRouteInterface,
  SignOutRouteInterface,
  ResendOtpRouteInterface,
} from "~/types/api/auth.types";

import type { UserGetRouteInterface } from "~/types/api/users.types";

import {
  SignInRequestSchema,
  SignUpRequestSchema,
  VerifyOtpRequestSchema,
  ResendOtpRequestSchema,
} from "~/types/api/auth.types";
import { apiRequest, validatedApiRequest } from "~/utils/api/apiRequest";

export function useAuth() {
  // Undefined means loading, null means no user exists
  const user = useState<User | undefined | null>("auth-user", () => undefined);

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

    user.value = null;
    useHouseholds().household.value = undefined;

    useRouter().push("/");
    return { success: true };
  }

  // Gets the user and fills the user state
  async function getUser(id?: string): Promise<User | null> {
    const { data, error } = await apiRequest<UserGetRouteInterface>(
      `/users/${id ? id : "me"}`,
      "GET",
    );

    if (!data || error) {
      user.value = null;
    } else {
      user.value = data.user;
      if (user.value) {
        useHouseholds().getHouseholds();
      }
    }

    return user.value;
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
    signIn: (email: string, password: string) =>
      withUserRefresh(signIn, email, password),
    signOut: (...args: any[]) => withUserRefresh(signOut, ...args),
    signUp,
    verifyOtp: (...args: any[]) => withUserRefresh(verifyOtp, ...args),
    getUser,
    resendOtp,
  };
}
