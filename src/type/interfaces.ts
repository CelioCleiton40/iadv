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

export interface TRCTFormData {
    // Dados do Empregador
    empregadorNome: string;
    empregadorCnpj: string;
    empregadorEndereco: string;

    // Dados do Trabalhador
    trabalhadorNome: string;
    trabalhadorCpf: string;
    trabalhadorCtps: string;
    trabalhadorPis: string;

    // Dados do Contrato
    dataAdmissao: string;
    dataAviso: string;
    dataAfastamento: string;
    motivoRescisao: string;

    // Dados Financeiros
    salarioBase: number;
    mesesTrabalhados: number;
    diasTrabalhados: number;
    saldoSalario: number;
    decimoTerceiro: number;
    feriasVencidas: number;
    feriasProporcional: number;
    avisoPrevio: number;
    multaFgts: number;
    outrasVerbas: number;

    // Descontos
    inss: number;
    irrf: number;
    outrosDescontos: number;
}

export const initialFormState: TRCTFormData = {
    empregadorNome: "",
    empregadorCnpj: "",
    empregadorEndereco: "",

    trabalhadorNome: "",
    trabalhadorCpf: "",
    trabalhadorCtps: "",
    trabalhadorPis: "",

    dataAdmissao: "",
    dataAviso: "",
    dataAfastamento: "",
    motivoRescisao: "pedido",

    salarioBase: 0,
    mesesTrabalhados: 0,
    diasTrabalhados: 0,
    saldoSalario: 0,
    decimoTerceiro: 0,
    feriasVencidas: 0,
    feriasProporcional: 0,
    avisoPrevio: 0,
    multaFgts: 0,
    outrasVerbas: 0,

    inss: 0,
    irrf: 0,
    outrosDescontos: 0
};

export const motivosRescisao = {
    pedido: "Pedido de demissão pelo empregado",
    semJustaCausa: "Dispensa sem justa causa pelo empregador",
    comJustaCausa: "Dispensa com justa causa pelo empregador",
    acordoMutuo: "Acordo mútuo entre as partes",
    terminoContrato: "Término de contrato por prazo determinado"
};