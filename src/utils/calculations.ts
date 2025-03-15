"use client";

import { TRCTFormData } from "@/type/interfaces";

export const calcularRescisao = (
    formData: TRCTFormData,
    setFormData: (formData: TRCTFormData) => void,
    setTotalProventos: (value: number) => void,
    setTotalDescontos: (value: number) => void,
    setValorLiquido: (value: number) => void
) => {
    const { salarioBase, diasTrabalhados, dataAdmissao, dataAfastamento, motivoRescisao, mesesTrabalhados, feriasVencidas, outrasVerbas, outrosDescontos } = formData;

    // Cálculo do saldo de salário
    const saldoSalario = (salarioBase / 30) * diasTrabalhados;

    // Cálculo do tempo de serviço em anos
    const admissao = new Date(dataAdmissao);
    const afastamento = new Date(dataAfastamento);
    const diffAnos = afastamento.getFullYear() - admissao.getFullYear();
    const diffMeses = afastamento.getMonth() - admissao.getMonth();
    const anosCompletos = diffAnos + (diffMeses < 0 || (diffMeses === 0 && afastamento.getDate() < admissao.getDate()) ? -1 : 0);

    // Cálculo do aviso prévio (indenizado)
    let avisoPrevioIndenizado = 0;
    if (motivoRescisao === "semJustaCausa") {
        const diasAviso = Math.min(30 + anosCompletos * 3, 90);
        avisoPrevioIndenizado = (salarioBase / 30) * diasAviso;
    } else if (motivoRescisao === "pedidoDeDemissao") {
        // Em caso de pedido de demissão, o empregado deve cumprir o aviso prévio,
        // ou o empregador pode indenizá-lo. Aqui consideramos que não há valor a ser pago.
        avisoPrevioIndenizado = 0;
    } else if (motivoRescisao === "acordoMutuo") {
        // No acordo mútuo, o aviso prévio indenizado é de 50% se indenizado.
        const diasAviso = Math.min(30 + anosCompletos * 3, 90);
        avisoPrevioIndenizado = ((salarioBase / 30) * diasAviso) / 2;
    }

    // Cálculo do 13º salário proporcional
    const mesesTrabalhadosDecimoTerceiro = afastamento.getMonth() - admissao.getMonth() + (afastamento.getFullYear() - admissao.getFullYear()) * 12 + 1;
    const mesesConsideradosDecimoTerceiro = Math.max(0, Math.min(12, mesesTrabalhadosDecimoTerceiro));
    const decimoTerceiroProporcional = (salarioBase / 12) * mesesConsideradosDecimoTerceiro;

    // Cálculo das férias proporcionais + 1/3
    const mesesTrabalhadosFerias = afastamento.getMonth() - admissao.getMonth() + (afastamento.getFullYear() - admissao.getFullYear()) * 12;
    const mesesConsideradosFerias = Math.max(0, Math.min(12, mesesTrabalhadosFerias));
    const feriasProporcionais = (salarioBase / 12) * mesesConsideradosFerias;
    const umTercoFeriasProporcionais = feriasProporcionais / 3;

    // Cálculo do INSS (tabela de 2024)
    const baseInss = saldoSalario + decimoTerceiroProporcional + avisoPrevioIndenizado;
    let inss = 0;
    if (baseInss <= 1412.00) inss = baseInss * 0.075;
    else if (baseInss <= 2666.64) inss = baseInss * 0.09 - 21.18;
    else if (baseInss <= 4000.12) inss = baseInss * 0.12 - 81.18;
    else if (baseInss <= 7786.02) inss = baseInss * 0.14 - 161.18;
    else inss = 7786.02 * 0.14 - 161.18;
    inss = Math.max(0, inss); // Garante que o INSS não seja negativo

    // Cálculo do IRRF (tabela de 2024)
    const baseIrrf = baseInss - inss;
    let irrf = 0;
    if (baseIrrf > 4664.68) irrf = baseIrrf * 0.275 - 896.00;
    else if (baseIrrf > 3751.05) irrf = baseIrrf * 0.225 - 662.77;
    else if (baseIrrf > 2826.65) irrf = baseIrrf * 0.15 - 381.44;
    else if (baseIrrf > 2259.20) irrf = baseIrrf * 0.075 - 169.44;
    irrf = Math.max(0, irrf); // Garante que o IRRF não seja negativo

    // Cálculo da multa do FGTS (considerando o saldo de FGTS como 8% * meses trabalhados * salário base - simplificado)
    let multaFgts = 0;
    if (motivoRescisao === "semJustaCausa") {
        const saldoFgts = salarioBase * 0.08 * mesesTrabalhados; // Simplificação
        multaFgts = saldoFgts * 0.40;
    } else if (motivoRescisao === "acordoMutuo") {
        const saldoFgts = salarioBase * 0.08 * mesesTrabalhados; // Simplificação
        multaFgts = saldoFgts * 0.20;
    }

    // Atualiza o estado com os valores calculados
    setFormData({
        ...formData,
        saldoSalario: parseFloat(saldoSalario.toFixed(2)),
        decimoTerceiro: parseFloat(decimoTerceiroProporcional.toFixed(2)),
        feriasProporcional: parseFloat(feriasProporcionais.toFixed(2)),
        umTercoFeriasProporcional: parseFloat(umTercoFeriasProporcionais.toFixed(2)),
        avisoPrevio: parseFloat(avisoPrevioIndenizado.toFixed(2)),
        multaFgts: parseFloat(multaFgts.toFixed(2)),
        inss: parseFloat(inss.toFixed(2)),
        irrf: parseFloat(irrf.toFixed(2))
    });

    // Cálculo dos totais
    const proventos =
        saldoSalario +
        decimoTerceiroProporcional +
        feriasProporcionais +
        umTercoFeriasProporcionais +
        avisoPrevioIndenizado +
        (feriasVencidas || 0) +
        (outrasVerbas || 0);

    const descontos = inss + irrf + (outrosDescontos || 0);
    const liquido = proventos - descontos;

    setTotalProventos(parseFloat(proventos.toFixed(2)));
    setTotalDescontos(parseFloat(descontos.toFixed(2)));
    setValorLiquido(parseFloat(liquido.toFixed(2)));
};