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