import { create } from 'zustand';

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
}

const useClienteStore = create<ClienteStore>((set) => ({
  clienteData: {
    tipo: '',
    nome: '',
    cpfCnpj: '',
    rgIe: '',
    dataNascimento: '',
    estadoCivil: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    telefone: '',
    celular: '',
    email: '',
    areaDireito: '',
    observacoes: '',
  },
  setClienteData: (newData) => set((state) => ({
    clienteData: { ...state.clienteData, ...newData }
  })),
  resetClienteData: () => set({ clienteData: {
    tipo: '',
    nome: '',
    cpfCnpj: '',
    rgIe: '',
    dataNascimento: '',
    estadoCivil: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    telefone: '',
    celular: '',
    email: '',
    areaDireito: '',
    observacoes: '',
  }}),
}));

export default useClienteStore;