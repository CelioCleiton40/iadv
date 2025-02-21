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

const preliminares = [
  "Ilegitimidade Passiva",
  "Incompetência do Juízo",
  "Inépcia da Inicial",
  "Prescrição",
  "Litispendência",
  "Coisa Julgada",
];

export default function Contestacao() {
  const [argumentos, setArgumentos] = useState([{ titulo: "", conteudo: "" }]);

  const addArgumento = () => {
    setArgumentos([...argumentos, { titulo: "", conteudo: "" }]);
  };

  const removeArgumento = (index: number) => {
    setArgumentos(argumentos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Contestação
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Elabore sua contestação com argumentos estruturados
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <form className="space-y-6">
                {/* Process Information */}
                <div className="space-y-4">
                  <Label>Informações do Processo</Label>
                  <Input placeholder="Número do Processo" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Vara" />
                    <Input placeholder="Comarca" />
                  </div>
                </div>

                {/* Parties */}
                <div className="space-y-4">
                  <Label>Partes</Label>
                  <Input placeholder="Autor" />
                  <Input placeholder="Réu" />
                </div>

                {/* Preliminary Arguments */}
                <div className="space-y-4">
                  <Label>Preliminares</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione as preliminares" />
                    </SelectTrigger>
                    <SelectContent>
                      {preliminares.map((preliminar) => (
                        <SelectItem key={preliminar} value={preliminar}>
                          {preliminar}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea 
                    placeholder="Fundamente as preliminares selecionadas" 
                    className="min-h-[100px]"
                  />
                </div>

                {/* Merit Arguments */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Argumentos de Mérito</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addArgumento}
                      className="flex items-center gap-2"
                    >
                      <MdAdd size={16} />
                      Adicionar Argumento
                    </Button>
                  </div>

                  {argumentos.map((argumento, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 p-4 border rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <Label>Argumento {index + 1}</Label>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArgumento(index)}
                            className="text-red-500"
                          >
                            <MdDelete size={16} />
                          </Button>
                        )}
                      </div>
                      <Input placeholder="Título do Argumento" />
                      <Textarea 
                        placeholder="Desenvolva seu argumento" 
                        className="min-h-[150px]"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Evidence */}
                <div className="space-y-4">
                  <Label>Provas</Label>
                  <Textarea 
                    placeholder="Das Provas" 
                    className="min-h-[150px]"
                  />
                </div>

                {/* Requests */}
                <div className="space-y-4">
                  <Label>Pedidos</Label>
                  <Textarea 
                    placeholder="Dos Pedidos" 
                    className="min-h-[150px]"
                  />
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