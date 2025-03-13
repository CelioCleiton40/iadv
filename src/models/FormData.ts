import { z } from "zod";

// Esquema de validação para os dados do formulário
export const formDataSchema = z.object({
  modelo: z.string().trim().min(3, "Modelo deve ter pelo menos 3 caracteres"),
  comarca: z.string().trim().min(3, "Comarca deve ter pelo menos 3 caracteres"),
  vara: z.string().trim().min(3, "Vara deve ter pelo menos 3 caracteres"),
  partes: z.array(
    z.object({
      nome: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres"),
      qualificacao: z.string().trim().min(5, "Qualificação deve ser mais detalhada"),
    })
  ).min(1, "É necessário pelo menos uma parte"),
  dosFatos: z.string().trim().min(10, "A seção 'Dos Fatos' deve ter pelo menos 10 caracteres"),
  doDireito: z.string().trim().min(10, "A seção 'Do Direito' deve ter pelo menos 10 caracteres"),
  dosPedidos: z.string().trim().min(10, "A seção 'Dos Pedidos' deve ter pelo menos 10 caracteres"),
  valorCausa: z.string()
    .trim()
    .regex(/^\d+(\.\d{1,2})?$/, "O valor da causa deve ser um número válido"),
});

// Interface TypeScript baseada no schema
export type FormData = z.infer<typeof formDataSchema>;
