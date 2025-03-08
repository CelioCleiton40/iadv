export interface DecisaoRecente {
    tipo: string;
    data: string;
    processo: string;
}

export interface Estatisticas {
    procedentes: number;
    parciais: number;
    improcedentes: number;
}

export interface Juiz {
    nome: string;
    vara: string;
    historico: string;
    especialidade: string;
    processos: number;
    tempoMedio: string;
    decisoesRecentes: DecisaoRecente[];
    estatisticas: Estatisticas;
    tendencias: string[];
    jurisprudencia: string[];
    alertas: string[];
    area: string;
}