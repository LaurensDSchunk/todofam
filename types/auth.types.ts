export interface User {
  id: string;
  email?: string;
  name: string;
}

export interface signInRequest {
  email: string;
  password: string;
}

export interface signUpRequest {
  email: string;
  name: string;
  password: string;
}

export interface verifyRequest {
  email: string;
  token: string;
  type: "signup";
}
