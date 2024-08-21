import { z } from "zod";
import { checkEmail } from "../services";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerSchema = z.object({
  name: z.string().min(3, { message: "Mínimo de 3 caracteres!" }),
  email: z.string().email({ message: "Email inválido!" }).refine(async (email) => {
    try {
      if (emailRegex.test(email)) await checkEmail(email);

      return true;
    } catch (error) {
      return false;
    }
  }, { message: "Email já cadastrado!" }),
  password: z.string().min(8, { message: "Mínimo de 8 caracteres!" }),
  repeatPassword: z.string(),
}).refine((data) => data.password === data.repeatPassword, {
  message: "As senhas não são iguais!",
  path: ["repeatPassword"],
});

export type RegisterFormInput = z.infer<typeof registerSchema>;