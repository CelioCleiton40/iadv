"use client"

import { TRCTFormData } from "@/type/interfaces";

export const calcularRescisao = (formData: TRCTFormData, setFormData: (formData: TRCTFormData) => void, setTotalProventos: (value: number) => void, setTotalDescontos: (value: number) => void, setValorLiquido: (value: number) => void) => {
    // Cálculo do saldo de salário (dias trabalhados no mês)
    const saldoSalario = (formData.salarioBase / 30) * formData.diasTrabalhados;

    // Cálculo do 13º proporcional
    const dataAfastamento = new Date(formData.dataAfastamento);
    const mesesDecimoTerceiro = dataAfastamento.getMonth() + 1; // +1 porque os meses começam em 0
    const decimoTerceiro = (formData.salarioBase / 12) * mesesDecimoTerceiro;

    // Cálculo de férias proporcionais
    const feriasProporcional = (formData.salarioBase / 12) * formData.mesesTrabalhados + (formData.salarioBase / 3); // Adiciona 1/3 constitucional

    // Cálculo do aviso prévio (se aplicável)
    let avisoPrevio = 0;
    if (formData.motivoRescisao === "semJustaCausa") {
        // 30 dias + 3 dias por ano trabalhado (limitado a 90 dias)
        const anosCompletos = Math.floor(formData.mesesTrabalhados / 12);
        const diasAviso = Math.min(30 + (anosCompletos * 3), 90);
        avisoPrevio = (formData.salarioBase / 30) * diasAviso;
    }

    // Cálculo da multa do FGTS (se aplicável)
    let multaFgts = 0;
    if (formData.motivoRescisao === "semJustaCausa" || formData.motivoRescisao === "acordoMutuo") {
        // Saldo do FGTS estimado (8% do salário por mês trabalhado)
        const saldoFgts = formData.salarioBase * 0.08 * formData.mesesTrabalhados; // **Observação:** Este é um cálculo *estimado* do saldo FGTS. O saldo real pode ser diferente.

        // Multa de 40% para demissão sem justa causa ou 20% para acordo mútuo
        const percentualMulta = formData.motivoRescisao === "semJustaCausa" ? 0.4 : 0.2;
        multaFgts = saldoFgts * percentualMulta;
    }

    // Cálculo do INSS sobre as verbas salariais
    const baseInss = saldoSalario + decimoTerceiro;
    let inss = 0;

    // Tabela INSS 2024 (Atualizada) - Referência: [https://www.gov.br/trabalho-e-emprego/pt-br/noticias/2024/janeiro/tabela-de-contribuicao-do-inss-para-2024-e-atualizada]
    if (baseInss <= 1412.00) { // Faixa 1
        inss = baseInss * 0.075;
    } else if (baseInss <= 2666.68) { // Faixa 2
        inss = baseInss * 0.09 - 105.90;
    } else if (baseInss <= 4000.03) { // Faixa 3
        inss = baseInss * 0.12 - 326.70;
    } else if (baseInss <= 7786.02) { // Faixa 4 (Teto)
        inss = baseInss * 0.14 - 586.47;
    } else {
        inss = 7786.02 * 0.14 - 586.47; // Aplica o teto da faixa 4 se a base for maior
    }

    // Cálculo do IRRF
    const baseIrrf = baseInss - inss; // Base de cálculo IRRF é o valor tributável menos a dedução do INSS
    let irrf = 0;

    // Tabela IRRF 2024 (Atualizada) - Referência: [https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/tributos/irpf/tabelas/tabela-progressiva-para-2024]
    if (baseIrrf <= 2259.20) { // Faixa 1 - Isento
        irrf = 0;
    } else if (baseIrrf <= 2826.65) { // Faixa 2
        irrf = (baseIrrf * 0.075) - 169.44;
    } else if (baseIrrf <= 3751.05) { // Faixa 3
        irrf = (baseIrrf * 0.15) - 381.44;
    } else if (baseIrrf <= 4664.68) { // Faixa 4
        irrf = (baseIrrf * 0.225) - 662.77;
    } else { // Faixa 5 (Acima de 4664.68)
        irrf = (baseIrrf * 0.275) - 896.00;
    }

    // Atualiza os valores calculados no estado
    setFormData({
        ...formData,
        saldoSalario: parseFloat(saldoSalario.toFixed(2)),
        decimoTerceiro: parseFloat(decimoTerceiro.toFixed(2)),
        feriasProporcional: parseFloat(feriasProporcional.toFixed(2)),
        avisoPrevio: parseFloat(avisoPrevio.toFixed(2)),
        multaFgts: parseFloat(multaFgts.toFixed(2)),
        inss: parseFloat(inss.toFixed(2)),
        irrf: parseFloat(irrf.toFixed(2))
    });

    // Calcula totais
    const proventos = saldoSalario + decimoTerceiro + feriasProporcional + avisoPrevio + multaFgts + formData.outrasVerbas + formData.feriasVencidas; // **Correção:** Adicionado `feriasVencidas` ao cálculo de proventos
    const descontos = inss + irrf + formData.outrosDescontos;
    const liquido = proventos - descontos;

    setTotalProventos(parseFloat(proventos.toFixed(2)));
    setTotalDescontos(parseFloat(descontos.toFixed(2)));
    setValorLiquido(parseFloat(liquido.toFixed(2)));
};