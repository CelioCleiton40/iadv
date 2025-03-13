"use client";

import { TRCTFormData } from "@/type/interfaces";

export const calcularRescisao = (
  formData: TRCTFormData,
  setFormData: (formData: TRCTFormData) => void,
  setTotalProventos: (value: number) => void,
  setTotalDescontos: (value: number) => void,
  setValorLiquido: (value: number) => void
) => {
  // Cálculo do saldo de salário
  const saldoSalario = (formData.salarioBase / 30) * formData.diasTrabalhados;

  // Cálculo do 13º proporcional
  const dataAfastamento = new Date(formData.dataAfastamento);
  const mesesDecimoTerceiro = dataAfastamento.getMonth() + 1;
  const decimoTerceiro = (formData.salarioBase / 12) * mesesDecimoTerceiro;

  // Cálculo de férias proporcionais
  const feriasProporcional = (formData.salarioBase / 12) * formData.mesesTrabalhados + (formData.salarioBase / 3);

  // Cálculo do aviso prévio
  let avisoPrevio = 0;
  if (formData.motivoRescisao === "semJustaCausa") {
    const anosCompletos = Math.floor(formData.mesesTrabalhados / 12);
    const diasAviso = Math.min(30 + anosCompletos * 3, 90);
    avisoPrevio = (formData.salarioBase / 30) * diasAviso;
  }

  // Cálculo da multa do FGTS
  let multaFgts = 0;
  if (formData.motivoRescisao === "semJustaCausa" || formData.motivoRescisao === "acordoMutuo") {
    const saldoFgts = formData.salarioBase * 0.08 * formData.mesesTrabalhados;
    const percentualMulta = formData.motivoRescisao === "semJustaCausa" ? 0.4 : 0.2;
    multaFgts = saldoFgts * percentualMulta;
  }

  // Cálculo do INSS
  const baseInss = saldoSalario + decimoTerceiro;
  let inss = 0;
  if (baseInss <= 1518.0) inss = baseInss * 0.075;
  else if (baseInss <= 2666.68) inss = baseInss * 0.09 - 105.9;
  else if (baseInss <= 4000.03) inss = baseInss * 0.12 - 326.7;
  else if (baseInss <= 7786.02) inss = baseInss * 0.14 - 586.47;
  else inss = 7786.02 * 0.14 - 586.47;

  // Cálculo do IRRF
  const baseIrrf = baseInss - inss;
  let irrf = 0;
  if (baseIrrf > 4664.68) irrf = baseIrrf * 0.275 - 896.0;
  else if (baseIrrf > 3751.05) irrf = baseIrrf * 0.225 - 662.77;
  else if (baseIrrf > 2826.65) irrf = baseIrrf * 0.15 - 381.44;
  else if (baseIrrf > 2259.2) irrf = baseIrrf * 0.075 - 169.44;

  // Atualiza o estado com os valores calculados
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

  // Cálculo dos totais
  const proventos =
    saldoSalario +
    decimoTerceiro +
    feriasProporcional +
    avisoPrevio +
    multaFgts +
    formData.outrasVerbas +
    formData.feriasVencidas;
  const descontos = inss + irrf + formData.outrosDescontos;
  const liquido = proventos - descontos;

  setTotalProventos(parseFloat(proventos.toFixed(2)));
  setTotalDescontos(parseFloat(descontos.toFixed(2)));
  setValorLiquido(parseFloat(liquido.toFixed(2)));
};
