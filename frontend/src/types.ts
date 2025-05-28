import { z } from "zod";

export const signUpFormValidation = z.object({
  fullName: z.string().min(2, "enter a name including atleast two character"),
  email: z.string().email("This is not a valid email"),
  password: z.string().min(6, "atleast 6 character"),
});

export const LoginFormValidation = z.object({
  email: z.string().email("This is not a valid email"),
  password: z.string().min(6, "atleast 6 character"),
});
