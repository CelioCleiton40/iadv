"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { MdSave, MdPreview } from "react-icons/md";

const poderes = [
  { id: "geral", label: "Poderes Gerais da Cláusula 'Ad Judicia'" },
  { id: "extra", label: "Poderes Especiais 'Et Extra'" },
  { id: "acordo", label: "Fazer Acordos" },
  { id: "receber", label: "Receber e Dar Quitação" },
  { id: "substabelecer", label: "Substabelecer" },
  { id: "desistir", label: "Desistir" },
  { id: "confessar", label: "Confessar" },
  { id: "reconvir", label: "Reconvir" },
  { id: "recursos", label: "Interpor Recursos" },
  { id: "medidas", label: "Requerer Medidas Preventivas" }
];

const tiposProcuracao = [
  { id: "judicial", label: "Procuração Judicial" },
  { id: "extrajudicial", label: "Procuração Extrajudicial" },
  { id: "previdenciario", label: "Procuração Previdenciária" },
  { id: "trabalhista", label: "Procuração Trabalhista" }
];

export default function Procuracoes() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Procuração
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Gere procurações personalizadas com poderes específicos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <form className="space-y-6">
                {/* Procuration Type */}
                <div className="space-y-4">
                  <Label>Tipo de Procuração</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {tiposProcuracao.map((tipo) => (
                      <div
                        key={tipo.id}
                        className="flex items-center space-x-2 p-4 border rounded-lg hover:border-blue-500 cursor-pointer"
                      >
                        <input
                          type="radio"
                          id={tipo.id}
                          name="tipo"
                          className="text-blue-600"
                        />
                        <Label htmlFor={tipo.id} className="cursor-pointer">
                          {tipo.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outorgante (Grantor) */}
                <div className="space-y-4">
                  <Label>Outorgante</Label>
                  <Input placeholder="Nome completo" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Nacionalidade" />
                    <Input placeholder="Estado Civil" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Profissão" />
                    <Input placeholder="RG" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="CPF" />
                    <Input placeholder="Endereço" />
                  </div>
                </div>

                {/* Outorgado (Grantee) */}
                <div className="space-y-4">
                  <Label>Outorgado</Label>
                  <Input placeholder="Nome completo" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Nacionalidade" />
                    <Input placeholder="Estado Civil" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="OAB" />
                    <Input placeholder="Endereço Profissional" />
                  </div>
                </div>

                {/* Powers */}
                <div className="space-y-4">
                  <Label>Poderes</Label>
                  <Card className="p-4 bg-slate-100 dark:bg-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {poderes.map((poder) => (
                        <div key={poder.id} className="flex items-center space-x-2">
                          <Checkbox id={poder.id} />
                          <Label htmlFor={poder.id} className="cursor-pointer">
                            {poder.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Specific Powers */}
                <div className="space-y-4">
                  <Label>Poderes Específicos</Label>
                  <Textarea 
                    placeholder="Descreva outros poderes específicos..." 
                    className="min-h-[100px]"
                  />
                </div>

                {/* Process or Purpose */}
                <div className="space-y-4">
                  <Label>Finalidade</Label>
                  <Textarea 
                    placeholder="Especifique o processo ou finalidade da procuração..." 
                    className="min-h-[100px]"
                  />
                </div>

                {/* Validity */}
                <div className="space-y-4">
                  <Label>Prazo de Validade</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="date" />
                    <div className="flex items-center space-x-2">
                      <Checkbox id="indeterminate" />
                      <Label htmlFor="indeterminate">Prazo Indeterminado</Label>
                    </div>
                  </div>
                </div>
              </form>
            </Card>
          </div>

          {/* Preview and Actions */}
          <div className="space-y-6">
            <Card className="p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
                Ações
              </h3>
              <div className="space-y-4">
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