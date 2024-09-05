import { z } from 'zod';

export const walletSchema = z.object({
  description: z
    .string()
    .min(5, 'A descrição deve ter pelo menos 5 caracteres'),
  value: z
    .string()
    .min(1, 'Valor é obrigatório')
    .refine((value) => Number(value.replace(',', '.')), {
      message: 'Digite um valor válido',
    }),
  paymentMethod: z.string().min(3, 'O método de pagamento é obrigatório'),
});

export type WalletFormInput = z.infer<typeof walletSchema>;
