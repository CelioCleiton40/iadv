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
import { motion } from "framer-motion";
import { MdSave, MdPreview, MdCalculate } from "react-icons/md";

const motivosRescisao = [
  { id: "pedido", label: "Pedido de Demissão" },
  { id: "sem_justa", label: "Dispensa sem Justa Causa" },
  { id: "com_justa", label: "Dispensa com Justa Causa" },
  { id: "acordo", label: "Acordo entre as Partes" },
  { id: "culpa_reciproca", label: "Culpa Recíproca" }
];

export default function TRCT() {
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
                      {motivosRescisao.map((motivo) => (
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
                  <Label className="text-lg font-semibold">Proventos</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Saldo de Salário" />
                    <Input placeholder="13º Salário Proporcional" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Férias Vencidas" />
                    <Input placeholder="Férias Proporcionais" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="1/3 Férias" />
                    <Input placeholder="Aviso Prévio" />
                  </div>
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
                      <Input readOnly className="bg-white dark:bg-slate-700" />
                    </div>
                    <div>
                      <Label>Total Deduções</Label>
                      <Input readOnly className="bg-white dark:bg-slate-700" />
                    </div>
                  </div>
                  <div>
                    <Label>Valor Líquido</Label>
                    <Input readOnly className="bg-white dark:bg-slate-700 font-bold" />
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
                <Button className="w-full flex items-center gap-2">
                  <MdCalculate size={18} />
                  Calcular
                </Button>
                <Button className="w-full flex items-center gap-2">
                  <MdPreview size={18} />
                  Visualizar
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
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