import { create } from "zustand";
import { z } from "zod";

// Esquema de validação com Zod
const parteSchema = z.object({
  nome: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres").max(100).trim(),
  cpfCnpj: z.string().optional().refine((val) => !val || /^[0-9]{11,14}$/.test(val), {
    message: "CPF/CNPJ inválido",
  }),
  endereco: z.string().max(200).trim().optional(),
});

const advogadoSchema = z.object({
  nome: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres").max(100).trim(),
  oab: z.string().min(5, "Número da OAB inválido").max(20).trim(),
  contato: z.string().min(10, "Contato inválido").max(20).trim(),
});

const documentoSchema = z.object({
  nome: z.string().min(3).max(100).trim(),
  tipo: z.string().max(50).trim(),
  tamanho: z.string().max(20).trim(),
});

const formSchema = z.object({
  numeroProcesso: z.string().min(5, "Número do processo inválido").max(30).trim(),
  areaDireito: z.string().max(50).trim(),
  vara: z.string().max(50).trim(),
  faseProcessual: z.string().max(50).trim(),
  dataDistribuicao: z.string().max(10).trim().optional(),
  valorCausa: z.string().max(20).trim().optional(),
  objetoAcao: z.string().min(10, "O objeto da ação precisa ter pelo menos 10 caracteres").max(500).trim(),
  parteAutora: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres").max(100).trim(),
  parteRe: parteSchema,
  advogadoContrario: advogadoSchema,
  documentos: z.array(documentoSchema).default([]),
});

export interface Parte {
  nome: string;
  cpfCnpj?: string;
  endereco?: string;
}

export interface Advogado {
  nome: string;
  oab: string;
  contato: string;
}

export interface Documento {
  nome: string;
  tipo: string;
  tamanho: string;
}

export interface FormData {
  numeroProcesso: string;
  areaDireito: string;
  vara: string;
  faseProcessual: string;
  dataDistribuicao?: string;
  valorCausa?: string;
  objetoAcao: string;
  parteAutora: string;
  parteRe: Parte;
  advogadoContrario: Advogado;
  documentos: Documento[];
}

export interface FormStore {
  formData: FormData;
  setFormData: (newData: Partial<FormData>) => void;
  resetForm: () => void;
  previewVisible: boolean;
  setPreviewVisible: (visible: boolean) => void;
}

export const initialState: FormData = {
  numeroProcesso: "",
  areaDireito: "",
  vara: "",
  faseProcessual: "",
  dataDistribuicao: "",
  valorCausa: "",
  objetoAcao: "",
  parteAutora: "",
  parteRe: {
    nome: "",
    cpfCnpj: "",
    endereco: "",
  },
  advogadoContrario: {
    nome: "",
    oab: "",
    contato: "",
  },
  documentos: [],
};

const useFormCaseStore = create<FormStore>((set, get) => ({
  formData: initialState,

  // 🚀 Atualiza os dados e valida antes de salvar
  setFormData: (newData) => {
    const currentState = get().formData;
    const mergedData = { ...currentState, ...newData };

    const parsed = formSchema.safeParse(mergedData);
    if (!parsed.success) {
      console.error("Erro de validação:", parsed.error.format());
      return;
    }

    set({ formData: parsed.data });
  },

  resetForm: () => set({ formData: initialState }),

  previewVisible: false,
  setPreviewVisible: (visible) => set({ previewVisible: visible }),
}));

export default useFormCaseStore;
