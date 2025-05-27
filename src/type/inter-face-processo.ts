import { z } from 'zod';

// Regex para CPF (11 dígitos)
const cpfRegex = /^\d{11}$/;

// Regex para número do processo (20 dígitos)
const numeroProcessoRegex = /^\d{20}$/;

export const consultaProcessoSchema = z.object({
  termo: z.string().min(1, 'Digite um termo para pesquisa'),
  tipo: z.enum(['cpf', 'nome', 'numero']),
});

export interface Processo {
  numero: string;
  vara: string;
  comarca: string;
  uf: string;
  partes: {
    autor: string;
    reu: string;
  };
  dataDistribuicao: string;
  ultimoMovimento: {
    data: string;
    descricao: string;
  };
  status: string;
}

export type ConsultaProcesso = z.infer<typeof consultaProcessoSchema>;