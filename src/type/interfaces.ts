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
    umTercoFeriasProporcional: 0,
    avisoPrevio: 0,
    multaFgts: 0,
    outrasVerbas: 0,

    inss: 0,
    irrf: 0,
    outrosDescontos: 0
};

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
    umTercoFeriasProporcional: number;
    avisoPrevio: number;
    multaFgts: number;
    outrasVerbas: number;

    // Descontos
    inss: number;
    irrf: number;
    outrosDescontos: number;
}

export const motivosRescisao = {
    pedido: "Pedido de Demissão",
    semJustaCausa: "Dispensa Sem Justa Causa",
    comJustaCausa: "Dispensa Por Justa Causa",
    acordoMutuo: "Rescisão Por Acordo Entre Empregado e Empregador",
    terminoContrato: "Término de Contrato Por Prazo Determinado"
};