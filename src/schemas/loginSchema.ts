import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Tests" }).email({ message: "Email inválido!" }),
  password: z.string(),
});

export type LoginFormInput = z.infer<typeof loginSchema>;