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
import { MdSave, MdPreview, MdAdd, MdDelete, MdAttachFile } from "react-icons/md";
import { useState } from "react";

const tiposAcordo = [
  { id: "extrajudicial", label: "Acordo Extrajudicial" },
  { id: "judicial", label: "Acordo Judicial" },
  { id: "trabalhista", label: "Acordo Trabalhista" },
  { id: "consumidor", label: "Acordo de Consumo" },
  { id: "civil", label: "Acordo Civil" }
];

export default function Acordos() {
  const [clausulas, setClausulas] = useState([{ titulo: "", conteudo: "" }]);
  const [parcelas, setParcelas] = useState([{ valor: "", vencimento: "" }]);

  const addClausula = () => {
    setClausulas([...clausulas, { titulo: "", conteudo: "" }]);
  };

  const addParcela = () => {
    setParcelas([...parcelas, { valor: "", vencimento: "" }]);
  };

  const removeClausula = (index: number) => {
    setClausulas(clausulas.filter((_, i) => i !== index));
  };

  const removeParcela = (index: number) => {
    setParcelas(parcelas.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 mb-2">  Acordos
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Elabore acordos e termos de conciliação
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <form className="space-y-6">
                {/* Agreement Type */}
                <div className="space-y-4">
                  <Label>Tipo de Acordo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de acordo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposAcordo.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.id}>
                          {tipo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Parties */}
                <div className="space-y-4">
                  <Label>Partes</Label>
                  <Card className="p-4 space-y-4">
                    <div className="space-y-4">
                      <Label>Parte 1</Label>
                      <Input placeholder="Nome completo" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="CPF/CNPJ" />
                        <Input placeholder="RG" />
                      </div>
                      <Input placeholder="Endereço" />
                    </div>
                    <div className="space-y-4">
                      <Label>Parte 2</Label>
                      <Input placeholder="Nome completo" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="CPF/CNPJ" />
                        <Input placeholder="RG" />
                      </div>
                      <Input placeholder="Endereço" />
                    </div>
                  </Card>
                </div>

                {/* Object */}
                <div className="space-y-4">
                  <Label>Objeto do Acordo</Label>
                  <Textarea 
                    placeholder="Descreva o objeto do acordo..." 
                    className="min-h-[100px]"
                  />
                </div>

                {/* Value and Payment */}
                <div className="space-y-4">
                  <Label>Valor e Forma de Pagamento</Label>
                  <Input placeholder="Valor Total (R$)" />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Parcelas</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addParcela}
                        className="flex items-center gap-2"
                      >
                        <MdAdd size={16} />
                        Adicionar Parcela
                      </Button>
                    </div>

                    {parcelas.map((parcela, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-4"
                      >
                        <Input placeholder="Valor da Parcela" />
                        <Input type="date" />
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeParcela(index)}
                            className="text-red-500"
                          >
                            <MdDelete size={16} />
                          </Button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Clauses */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Cláusulas</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addClausula}
                      className="flex items-center gap-2"
                    >
                      <MdAdd size={16} />
                      Adicionar Cláusula
                    </Button>
                  </div>

                  {clausulas.map((clausula, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 p-4 border rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <Label>Cláusula {index + 1}</Label>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeClausula(index)}
                            className="text-red-500"
                          >
                            <MdDelete size={16} />
                          </Button>
                        )}
                      </div>
                      <Input placeholder="Título da Cláusula" />
                      <Textarea 
                        placeholder="Conteúdo da cláusula..." 
                        className="min-h-[100px]"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Attachments */}
                <div className="space-y-4">
                  <Label>Anexos</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <MdAttachFile size={18} />
                      Documentos Pessoais
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <MdAttachFile size={18} />
                      Comprovantes
                    </Button>
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