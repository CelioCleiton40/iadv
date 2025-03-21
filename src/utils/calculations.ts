"use client";

import { TRCTFormData } from "@/type/interfaces";

// Tabelas de INSS e IRRF (2024)
const INSS_TABLE = [
    { max: 1412.00, rate: 0.075, deduction: 0 },
    { max: 2666.64, rate: 0.09, deduction: 21.18 },
    { max: 4000.12, rate: 0.12, deduction: 81.18 },
    { max: 7786.02, rate: 0.14, deduction: 161.18 },
];

const IRRF_TABLE = [
    { min: 4664.68, rate: 0.275, deduction: 896.00 },
    { min: 3751.05, rate: 0.225, deduction: 662.77 },
    { min: 2826.65, rate: 0.15, deduction: 381.44 },
    { min: 2259.20, rate: 0.075, deduction: 169.44 },
];

// Função para arredondar valores monetários
const round = (num: number): number => Math.round(num * 100) / 100;

// Cálculo do INSS
const calcularINSS = (base: number): number => {
    for (const { max, rate, deduction } of INSS_TABLE) {
        if (base <= max) return Math.max(0, base * rate - deduction);
    }
    const lastRow = INSS_TABLE[INSS_TABLE.length - 1];
    return Math.max(0, lastRow.max * lastRow.rate - lastRow.deduction);
};

// Cálculo do IRRF
const calcularIRRF = (base: number): number => {
    for (const { min, rate, deduction } of IRRF_TABLE) {
        if (base > min) return Math.max(0, base * rate - deduction);
    }
    return 0;
};

// Cálculo da multa do FGTS
const calcularMultaFGTS = (salarioBase: number, mesesTrabalhados: number, motivoRescisao: string): number => {
    if (!["semJustaCausa", "acordoMutuo"].includes(motivoRescisao)) return 0;

    const saldoFgts = salarioBase * 0.08 * mesesTrabalhados;
    const taxa = motivoRescisao === "semJustaCausa" ? 0.4 : 0.2;
    return round(saldoFgts * taxa);
};

export const calcularRescisao = (
    formData: TRCTFormData,
    setFormData: (formData: TRCTFormData) => void,
    setTotalProventos: (value: number) => void,
    setTotalDescontos: (value: number) => void,
    setValorLiquido: (value: number) => void
) => {
    const {
        salarioBase = 0,
        diasTrabalhados = 0,
        dataAdmissao,
        dataAfastamento,
        motivoRescisao,
        feriasVencidas = 0,
        outrasVerbas = 0,
        outrosDescontos = 0,
    } = formData;

    // Validação de datas
    if (!dataAdmissao || !dataAfastamento) {
        console.error("Datas de admissão e afastamento são obrigatórias.");
        return;
    }

    const admissao = new Date(dataAdmissao);
    const afastamento = new Date(dataAfastamento);

    // Cálculo dos meses trabalhados
    const calcularMesesTrabalhados = () =>
        (afastamento.getFullYear() - admissao.getFullYear()) * 12 +
        (afastamento.getMonth() - admissao.getMonth());

    const mesesTrabalhadosTotal = calcularMesesTrabalhados();
    const saldoSalario = round((salarioBase / 30) * diasTrabalhados);

    // Aviso prévio indenizado
    const anosCompletos = Math.floor(mesesTrabalhadosTotal / 12);
    let avisoPrevioIndenizado = 0;

    switch (motivoRescisao) {
        case "semJustaCausa":
            avisoPrevioIndenizado = round((salarioBase / 30) * Math.min(30 + anosCompletos * 3, 90));
            break;
        case "acordoMutuo":
            avisoPrevioIndenizado = round(((salarioBase / 30) * Math.min(30 + anosCompletos * 3, 90)) / 2);
            break;
        default:
            avisoPrevioIndenizado = 0;
    }

    // Décimo terceiro proporcional
    const decimoTerceiroProporcional = round((salarioBase / 12) * Math.min(12, mesesTrabalhadosTotal + 1));

    // Férias proporcionais + 1/3
    const feriasProporcionais = round((salarioBase / 12) * Math.min(12, mesesTrabalhadosTotal));
    const umTercoFeriasProporcionais = round(feriasProporcionais / 3);

    // INSS e IRRF
    const baseInss = saldoSalario + decimoTerceiroProporcional + avisoPrevioIndenizado;
    const inss = calcularINSS(baseInss);
    const irrf = calcularIRRF(baseInss - inss);

    // Multa do FGTS
    const multaFgts = calcularMultaFGTS(salarioBase, mesesTrabalhadosTotal, motivoRescisao);

    // Atualização do formulário
    setFormData({
        ...formData,
        saldoSalario,
        decimoTerceiro: decimoTerceiroProporcional,
        feriasProporcional: feriasProporcionais,
        umTercoFeriasProporcional: umTercoFeriasProporcionais,
        avisoPrevio: avisoPrevioIndenizado,
        multaFgts,
        inss,
        irrf,
    });

    // Cálculo dos totais
    const proventos =
        saldoSalario +
        decimoTerceiroProporcional +
        feriasProporcionais +
        umTercoFeriasProporcionais +
        avisoPrevioIndenizado +
        feriasVencidas +
        outrasVerbas;

    const descontos = inss + irrf + outrosDescontos;
    const liquido = proventos - descontos;

    setTotalProventos(round(proventos));
    setTotalDescontos(round(descontos));
    setValorLiquido(round(liquido));
};