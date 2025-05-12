import { z } from "zod";

// Regex para CPF (11 dígitos)
const cpfRegex = /^\d{11}$/;

// Regex para telefone (ex: 84999887766 - 10 ou 11 dígitos)
const telefoneRegex = /^\d{10,11}$/;

export const perfilSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome muito longo"),

  cpf: z
    .string()
    .regex(cpfRegex, "CPF inválido. Use apenas números (11 dígitos)"),

  email: z.string().email("Email inválido"),

  telefone: z
    .string()
    .regex(telefoneRegex, "Telefone inválido. Use o formato 84999887766"),

  dataNascimento: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data de nascimento inválida",
    }),

  estadoCivil: z.string().optional(),

  oab: z
    .string()
    .min(4, "Número da OAB inválido (mínimo 4 caracteres)"),

  estado: z
    .string()
    .min(2, "Estado inválido")
    .max(2, "Use sigla do estado (ex: RN)"),

  especialidade: z
    .string()
    .min(3, "Informe pelo menos uma área de atuação"),

  escritorio: z
    .string()
    .min(2, "Nome do escritório muito curto"),

  dataInscricaoOAB: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data de inscrição inválida",
    })
    .optional(),

  situacao: z.string(),
});

// Tipo inferido a partir do schema
export type Perfil = z.infer<typeof perfilSchema>;