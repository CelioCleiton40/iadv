import { create } from 'zustand';

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
  dataDistribuicao: string;
  valorCausa: string;
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
  previewVisible: boolean; // Linha ADICIONADA: Estado para visibilidade do Preview
  setPreviewVisible: (visible: boolean) => void; // Linha ADICIONADA: Função para alterar visibilidade
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
    endereco: ""
  },
  advogadoContrario: {
    nome: "",
    oab: "",
    contato: ""
  },
  documentos: []
};

const useFormCaseStore = create<FormStore>((set) => ({
  formData: initialState,
  setFormData: (newData) => set((state) => ({
    formData: { ...state.formData, ...newData }
  })),
  resetForm: () => set({ formData: initialState }),
  previewVisible: false, // Linha ADICIONADA: Inicializando previewVisible no estado
  setPreviewVisible: (visible) => set({ previewVisible: visible }), // Linha ADICIONADA: Função para setar previewVisible
}));

export default useFormCaseStore;