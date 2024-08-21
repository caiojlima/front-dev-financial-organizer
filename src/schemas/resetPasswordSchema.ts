import { z } from "zod";

export const resetPasswordSchema = z.object({
  password: z.string().min(8, { message: "Mínimo de 8 caracteres!" }),
  repeatPassword: z.string(),
}).refine((data) => data.password === data.repeatPassword, {
  message: "As senhas não são iguais!",
  path: ["repeatPassword"],
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;