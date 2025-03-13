import { create } from "zustand";
import { z } from "zod";

// Esquema de validação com Zod
const clienteSchema = z.object({
  tipo: z.string().min(1, "O tipo é obrigatório"),
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").trim(),
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
  email: z.string().email("E-mail inválido").toLowerCase().trim().optional(),
  areaDireito: z.string().optional(),
  observacoes: z.string().optional(),
});

export interface Cliente {
  tipo: string;
  nome: string;
  cpfCnpj: string;
  rgIe: string;
  dataNascimento: string;
  estadoCivil: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  telefone: string;
  celular: string;
  email: string;
  areaDireito: string;
  observacoes: string;
}

export interface ClienteStore {
  clienteData: Cliente;
  setClienteData: (newData: Partial<Cliente>) => void;
  resetClienteData: () => void;
  errors: Partial<Record<keyof Cliente, string>>; // Guarda os erros de validação
}

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

const useClienteStore = create<ClienteStore>((set) => ({
  clienteData: initialState,
  errors: {}, // Inicializando os erros vazios

  setClienteData: (newData) => {
    // Faz a validação antes de atualizar o estado
    const parsed = clienteSchema.safeParse({ ...newData });

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
      clienteData: { ...state.clienteData, ...newData },
      errors: {},
    }));
  },

  resetClienteData: () =>
    set({
      clienteData: initialState,
      errors: {},
    }),
}));

export default useClienteStore;
