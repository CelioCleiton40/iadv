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
import { MdDownload, MdPrint, MdFilterList } from "react-icons/md";

export default function Relatorios() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Relatórios Financeiros
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Gere relatórios detalhados das suas finanças
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="p-6 lg:col-span-2">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Filtros</h3>
                <Button variant="outline" className="flex items-center gap-2">
                  <MdFilterList size={18} />
                  Aplicar Filtros
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Período Inicial</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Período Final</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Relatório</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="receitas">Receitas</SelectItem>
                      <SelectItem value="despesas">Despesas</SelectItem>
                      <SelectItem value="dre">DRE</SelectItem>
                      <SelectItem value="fluxo">Fluxo de Caixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex items-center gap-2">
                  <MdDownload size={18} />
                  Exportar PDF
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MdPrint size={18} />
                  Imprimir
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}