import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido!" }),
  password: z.string().min(8, { message: "Mínimo de 8 caracteres!" }),
});

export type LoginFormInput = z.infer<typeof loginSchema>;