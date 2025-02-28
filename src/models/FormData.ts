export interface FormData {
    modelo: string;
    comarca: string;
    vara: string;
    partes: { nome: string; qualificacao: string }[];
    dosFatos: string;
    doDireito: string;
    dosPedidos: string;
    valorCausa: string;
  }