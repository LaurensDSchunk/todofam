import { z } from "zod";

export const NameSchema = z
  .string()
  .regex(/^[A-Za-z\s'-]+$/, {
    message: "Name can only contain letters, spaces, hyphens, and apostrophes.",
  })
  .transform((arg: string) => {
    return arg
      .trim()
      .replace(/[\s]+/g, " ") // Collapse multiple spaces
      .replace(/[-]+/g, "-") // Collapse multiple hyphens
      .replace(/[']+/g, "'"); // Collapse multiple apostrophes
  })
  .refine((val) => val.length > 0, {
    message: "Name cannot be empty after formatting",
  });

export const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(64, "Password must be at most 64 characters long")
  .regex(/^[\x21-\x7E]+$/, "Password contains invalid characters") // printable ASCII excluding space
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  );

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: NameSchema,
  email: z.string().email().optional(),
});
export type User = z.infer<typeof UserSchema>;

export const SignInRequestSchema = z.object({
  email: z.string().email(),
  password: PasswordSchema,
});
export type SignInRequest = z.infer<typeof SignInRequestSchema>;

export const SignUpRequestSchema = z.object({
  email: z.string().email(),
  name: NameSchema,
  password: PasswordSchema,
});
export type SignUpRequest = z.infer<typeof SignUpRequestSchema>;

export const VerifyOtpRequestSchema = z.object({
  email: z.string().email(),
  token: z.string().length(6),
  type: z.enum(["signup"]),
});
export type VerifyOtpRequest = z.infer<typeof VerifyOtpRequestSchema>;
