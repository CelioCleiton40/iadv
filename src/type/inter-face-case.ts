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
