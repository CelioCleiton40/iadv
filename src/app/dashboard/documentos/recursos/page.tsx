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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { MdSave, MdPreview, MdAdd, MdDelete, MdAttachFile } from "react-icons/md";
import { useState } from "react";

const tiposRecurso = {
  apelacao: {
    nome: "Apelação",
    requisitos: ["Tempestividade", "Preparo", "Regularidade Formal"],
  },
  agravo: {
    nome: "Agravo de Instrumento",
    requisitos: ["Cópia da decisão agravada", "Certidão de intimação", "Procuração"],
  },
  embargos: {
    nome: "Embargos de Declaração",
    requisitos: ["Omissão", "Contradição", "Obscuridade"],
  },
  especial: {
    nome: "Recurso Especial",
    requisitos: ["Prequestionamento", "Violação à Lei Federal", "Divergência Jurisprudencial"],
  }
};

export default function Recursos() {
  const [razoes, setRazoes] = useState([{ titulo: "", conteudo: "" }]);

  const addRazao = () => {
    setRazoes([...razoes, { titulo: "", conteudo: "" }]);
  };

  const removeRazao = (index: number) => {
    setRazoes(razoes.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Recursos
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Elabore recursos processuais com fundamentação estruturada
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <form className="space-y-6">
                {/* Resource Type Selection */}
                <div className="space-y-4">
                  <Label>Tipo de Recurso</Label>
                  <Tabs defaultValue="apelacao" className="w-full">
                    <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                      {Object.entries(tiposRecurso).map(([key, { nome }]) => (
                        <TabsTrigger key={key} value={key} className="w-full">
                          {nome}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {Object.entries(tiposRecurso).map(([key, { nome, requisitos }]) => (
                      <TabsContent key={key} value={key} className="mt-4">
                        <Card className="p-4 bg-slate-100 dark:bg-slate-800">
                          <h3 className="font-medium mb-2">Requisitos para {nome}:</h3>
                          <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                            {requisitos.map((req) => (
                              <li key={req}>{req}</li>
                            ))}
                          </ul>
                        </Card>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>

                {/* Process Information */}
                <div className="space-y-4">
                  <Label>Informações do Processo</Label>
                  <Input placeholder="Número do Processo" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Vara/Câmara" />
                    <Input placeholder="Tribunal" />
                  </div>
                </div>

                {/* Parties */}
                <div className="space-y-4">
                  <Label>Partes</Label>
                  <Input placeholder="Recorrente" />
                  <Input placeholder="Recorrido" />
                </div>

                {/* Appeal Reasons */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Razões Recursais</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addRazao}
                      className="flex items-center gap-2"
                    >
                      <MdAdd size={16} />
                      Adicionar Razão
                    </Button>
                  </div>

                  {razoes.map((razao, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 p-4 border rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <Label>Razão {index + 1}</Label>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRazao(index)}
                            className="text-red-500"
                          >
                            <MdDelete size={16} />
                          </Button>
                        )}
                      </div>
                      <Input placeholder="Título da Razão Recursal" />
                      <Textarea 
                        placeholder="Desenvolva sua argumentação" 
                        className="min-h-[150px]"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Requests */}
                <div className="space-y-4">
                  <Label>Pedidos</Label>
                  <Textarea 
                    placeholder="Dos Pedidos" 
                    className="min-h-[150px]"
                  />
                </div>

                {/* Attachments */}
                <div className="space-y-4">
                  <Label>Documentos Obrigatórios</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <MdAttachFile size={18} />
                      Decisão Recorrida
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <MdAttachFile size={18} />
                      Procuração
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <MdAttachFile size={18} />
                      Guia de Preparo
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <MdAttachFile size={18} />
                      Outros Documentos
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