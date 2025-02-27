"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MdSave, MdPreview, MdCalculate } from "react-icons/md";
import { useState } from "react";

interface TRCTValues {
  saldoSalario: number;
  decimoTerceiro: number;
  feriasVencidas: number;
  feriasProporcionais: number;
  tercoFerias: number;
  avisoPrevio: number;
  inssSlario: number;
  inssDecimo: number;
  irrf: number;
  adiantamentos: number;
  outrasDeducoes: number;
  fgtsMes: number;
  multaFgts: number;
  fgtsDecimo: number;
  multaFgtsDecimo: number;
}

export default function TRCT() {
  const [values, setValues] = useState<TRCTValues>({
    saldoSalario: 0,
    decimoTerceiro: 0,
    feriasVencidas: 0,
    feriasProporcionais: 0,
    tercoFerias: 0,
    avisoPrevio: 0,
    inssSlario: 0,
    inssDecimo: 0,
    irrf: 0,
    adiantamentos: 0,
    outrasDeducoes: 0,
    fgtsMes: 0,
    multaFgts: 0,
    fgtsDecimo: 0,
    multaFgtsDecimo: 0,
  });

  const [totals, setTotals] = useState({
    totalBruto: 0,
    totalDeducoes: 0,
    valorLiquido: 0,
  });

  const handleInputChange =
    (field: keyof TRCTValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      setValues((prev) => ({ ...prev, [field]: value }));
    };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleBlur =
    (field: keyof TRCTValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      e.target.value = formatCurrency(value);
      setValues((prev) => ({ ...prev, [field]: value }));
    };

  const calculateTotals = () => {
    const proventos =
      values.saldoSalario +
      values.decimoTerceiro +
      values.feriasVencidas +
      values.feriasProporcionais +
      values.tercoFerias +
      values.avisoPrevio;

    const deducoes =
      values.inssSlario +
      values.inssDecimo +
      values.irrf +
      values.adiantamentos +
      values.outrasDeducoes;

    const fgtsTotal =
      values.fgtsMes +
      values.multaFgts +
      values.fgtsDecimo +
      values.multaFgtsDecimo;

    setTotals({
      totalBruto: proventos,
      totalDeducoes: deducoes,
      valorLiquido: proventos - deducoes,
    });
  };

  // Update the form inputs in the JSX
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Termo de Rescisão do Contrato de Trabalho (TRCT)
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Cálculo e geração de TRCT
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <form className="space-y-6">
                {/* Employee Information */}
                <div className="space-y-4">
                  <Label>Dados do Empregado</Label>
                  <Input placeholder="Nome completo" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="CPF" />
                    <Input placeholder="PIS" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="CTPS" />
                    <Input placeholder="Série/UF" />
                  </div>
                </div>

                {/* Contract Information */}
                <div className="space-y-4">
                  <Label>Dados do Contrato</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="date" placeholder="Data de Admissão" />
                    <Input type="date" placeholder="Data de Afastamento" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Cargo" />
                    <Input placeholder="CBO" />
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Motivo do Afastamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        { id: "1", label: "Pedido de Demissão" },
                        { id: "2", label: "Dispensa sem Justa Causa" },
                        { id: "3", label: "Dispensa com Justa Causa" },
                        { id: "4", label: "Término de Contrato" },
                      ].map((motivo) => (
                        <SelectItem key={motivo.id} value={motivo.id}>
                          {motivo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Earnings */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Saldo de Salário</Label>
                      <Input
                        type="text"
                        step="0.01"
                        value={values.saldoSalario || ""}
                        onChange={handleInputChange("saldoSalario")}
                        onBlur={handleBlur("saldoSalario")}
                      />
                    </div>
                    <div>
                      <Label>13º Salário Proporcional</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={values.decimoTerceiro || ""}
                        onChange={handleInputChange("decimoTerceiro")}
                      />
                    </div>
                  </div>
                  {/* Add similar input fields for other earnings */}
                </div>

                {/* Deductions */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Deduções</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="INSS sobre Saldo" />
                    <Input placeholder="INSS sobre 13º" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="IRRF" />
                    <Input placeholder="Adiantamentos" />
                  </div>
                  <Input placeholder="Outras Deduções" />
                </div>

                {/* FGTS */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">FGTS</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="FGTS do Mês" />
                    <Input placeholder="Multa FGTS (40%)" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="FGTS 13º Salário" />
                    <Input placeholder="Multa FGTS 13º (40%)" />
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-4 bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Total Bruto</Label>
                      <Input
                        type="text"
                        readOnly
                        disabled
                        className="bg-white dark:bg-slate-700"
                        value={totals.totalBruto}
                      />
                    </div>
                    <div>
                      <Label>Total Deduções</Label>
                      <Input
                        type="text"
                        readOnly
                        disabled
                        className="bg-white dark:bg-slate-700"
                        value={totals.totalDeducoes}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Valor Líquido</Label>
                    <Input
                      type="text"
                      readOnly
                      disabled
                      className="bg-white dark:bg-slate-700 font-bold"
                      value={totals.valorLiquido}
                    />
                  </div>
                </div>
              </form>
            </Card>
          </div>

          {/* Actions */}
          <div className="space-y-6">
            <Card className="p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
                Ações
              </h3>
              <div className="space-y-4">
                <Button
                  className="w-full flex items-center gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    calculateTotals();
                  }}
                >
                  <MdCalculate size={18} />
                  Calcular
                </Button>
                <Button className="w-full flex items-center gap-2">
                  <MdPreview size={18} />
                  Visualizar
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <MdSave size={18} />
                  Salvar
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
