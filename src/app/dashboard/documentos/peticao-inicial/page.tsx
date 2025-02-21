"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { MdSave, MdPreview, MdAdd, MdDelete } from "react-icons/md";
import { useState } from "react";

export default function PeticaoInicial() {
  const [partes, setPartes] = useState([{ nome: "", qualificacao: "" }]);

  const addParte = () => {
    setPartes([...partes, { nome: "", qualificacao: "" }]);
  };

  const removeParte = (index: number) => {
    setPartes(partes.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Petição Inicial
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Crie uma nova petição inicial usando nossos modelos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <form className="space-y-6">
                {/* Template Selection */}
                <div className="space-y-2">
                  <Label>Modelo de Petição</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um modelo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cobranca">Ação de Cobrança</SelectItem>
                      <SelectItem value="indenizacao">Ação de Indenização</SelectItem>
                      <SelectItem value="obrigacao">Obrigação de Fazer</SelectItem>
                      <SelectItem value="despejo">Ação de Despejo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Court Information */}
                <div className="space-y-4">
                  <Label>Informações do Juízo</Label>
                  <Input placeholder="Comarca" />
                  <Input placeholder="Vara" />
                </div>

                {/* Parties */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Partes do Processo</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addParte}
                      className="flex items-center gap-2"
                    >
                      <MdAdd size={16} />
                      Adicionar Parte
                    </Button>
                  </div>
                  
                  {partes.map((parte, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 p-4 border rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <Label>Parte {index + 1}</Label>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeParte(index)}
                            className="text-red-500"
                          >
                            <MdDelete size={16} />
                          </Button>
                        )}
                      </div>
                      <Input placeholder="Nome completo" />
                      <Textarea placeholder="Qualificação" />
                    </motion.div>
                  ))}
                </div>

                {/* Facts and Law */}
                <div className="space-y-4">
                  <Label>Fatos e Direito</Label>
                  <Textarea placeholder="Dos Fatos" className="min-h-[150px]" />
                  <Textarea placeholder="Do Direito" className="min-h-[150px]" />
                </div>

                {/* Requests */}
                <div className="space-y-4">
                  <Label>Pedidos</Label>
                  <Textarea placeholder="Dos Pedidos" className="min-h-[150px]" />
                </div>

                {/* Value */}
                <div className="space-y-2">
                  <Label>Valor da Causa</Label>
                  <Input type="text" placeholder="R$ 0,00" />
                </div>
              </form>
            </Card>
          </div>

          {/* Preview and Actions */}
          <div className="space-y-6">
            <Card className="p-6">
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
                  Salvar Rascunho
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}