import { create } from "zustand";
import { z } from "zod";
import { Cliente } from "@/type/inter-face-client"; // Certifique-se de importar o tipo Cliente correto do seu progra
import DOMPurify from "dompurify"; // Biblioteca para sanitização contra XSS

// Esquema de validação com Zod
const clienteSchema = z.object({
  tipo: z.string().min(1, "O tipo é obrigatório"),
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .trim()
    .refine((value) => !/<[a-z][\s\S]*>/i.test(value), {
      message: "Nome contém caracteres inválidos.",
    }), // Proteção contra tags HTML
  cpfCnpj: z
    .string()
    .min(11, "CPF/CNPJ inválido")
    .max(14, "CPF/CNPJ inválido")
    .optional()
    .or(z.literal("")),
  rgIe: z.string().optional(),
  dataNascimento: z.string().optional(),
  estadoCivil: z.string().optional(),
  endereco: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  cep: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  telefone: z.string().optional(),
  celular: z.string().optional(),
  email: z
    .string()
    .email("E-mail inválido")
    .toLowerCase()
    .trim()
    .optional(),
  areaDireito: z.string().optional(),
  observacoes: z
    .string()
    .optional()
    .refine((value) => value ? !/<[a-z][\s\S]*>/i.test(value) : true, {
      message: "Observações contém caracteres inválidos.",
    }), // Proteção contra tags HTML
});

const initialState: Cliente = {
  tipo: "",
  nome: "",
  cpfCnpj: "",
  rgIe: "",
  dataNascimento: "",
  estadoCivil: "",
  endereco: "",
  numero: "",
  complemento: "",
  bairro: "",
  cep: "",
  cidade: "",
  estado: "",
  telefone: "",
  celular: "",
  email: "",
  areaDireito: "",
  observacoes: "",
};

interface ClienteStore {
  clienteData: Cliente;
  errors: Partial<Record<keyof Cliente, string>>;
  setClienteData: (newData: Partial<Cliente>) => void;
  resetClienteData: () => void;
}

export const useClienteStore = create<ClienteStore>((set) => ({
  clienteData: initialState,
  errors: {}, // Inicializando os erros vazios

  setClienteData: (newData) => {
    // Sanitização básica para evitar XSS
    const sanitizedData = Object.fromEntries(
      Object.entries(newData).map(([key, value]) => [
        key,
        typeof value === "string" ? DOMPurify.sanitize(value) : value,
      ])
    );

    // Faz a validação antes de atualizar o estado
    const parsed = clienteSchema.safeParse(sanitizedData);

    if (!parsed.success) {
      const validationErrors: Partial<Record<keyof Cliente, string>> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          validationErrors[err.path[0] as keyof Cliente] = err.message;
        }
      });

      set({ errors: validationErrors });
      return;
    }

    // Se a validação passar, atualiza o estado e reseta erros
    set((state) => ({
      clienteData: { ...state.clienteData, ...sanitizedData },
      errors: {},
    }));
  },

  resetClienteData: () =>
    set({
      clienteData: initialState,
      errors: {},
    }),
}));
