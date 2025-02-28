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
import { MdSave, MdPreview, MdAdd, MdDelete, MdLink } from "react-icons/md";
import { useState } from "react";

const tiposPareceres = [
  { id: "civil", label: "Direito Civil" },
  { id: "trabalhista", label: "Direito Trabalhista" },
  { id: "tributario", label: "Direito Tributário" },
  { id: "administrativo", label: "Direito Administrativo" },
  { id: "empresarial", label: "Direito Empresarial" }
];

export default function Pareceres() {
  const [referencias, setReferencias] = useState([{ tipo: "", referencia: "" }]);
  const [fundamentacao, setFundamentacao] = useState([{ titulo: "", conteudo: "" }]);

  const addReferencia = () => {
    setReferencias([...referencias, { tipo: "", referencia: "" }]);
  };

  const addFundamentacao = () => {
    setFundamentacao([...fundamentacao, { titulo: "", conteudo: "" }]);
  };

  const removeReferencia = (index: number) => {
    setReferencias(referencias.filter((_, i) => i !== index));
  };

  const removeFundamentacao = (index: number) => {
    setFundamentacao(fundamentacao.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 mb-2">  Parecer Jurídico
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Elabore pareceres jurídicos detalhados e fundamentados
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <form className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <Label>Informações Básicas</Label>
                  <Input placeholder="Número do Parecer" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Área do Direito" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposPareceres.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.id}>
                          {tipo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input placeholder="Solicitante" />
                  <Input type="date" />
                </div>

                {/* Subject */}
                <div className="space-y-4">
                  <Label>Ementa</Label>
                  <Textarea 
                    placeholder="Resumo do tema e conclusão principal..." 
                    className="min-h-[100px]"
                  />
                </div>

                {/* Context */}
                <div className="space-y-4">
                  <Label>Contextualização</Label>
                  <Textarea 
                    placeholder="Descrição do contexto e questões a serem analisadas..." 
                    className="min-h-[150px]"
                  />
                </div>

                {/* Legal Basis */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Fundamentação</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addFundamentacao}
                      className="flex items-center gap-2"
                    >
                      <MdAdd size={16} />
                      Adicionar Tópico
                    </Button>
                  </div>

                  {fundamentacao.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 p-4 border rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <Label>Tópico {index + 1}</Label>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFundamentacao(index)}
                            className="text-red-500"
                          >
                            <MdDelete size={16} />
                          </Button>
                        )}
                      </div>
                      <Input placeholder="Título do Tópico" />
                      <Textarea 
                        placeholder="Desenvolvimento da argumentação..." 
                        className="min-h-[150px]"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* References */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Referências</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addReferencia}
                      className="flex items-center gap-2"
                    >
                      <MdAdd size={16} />
                      Adicionar Referência
                    </Button>
                  </div>

                  {referencias.map((ref, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-4"
                    >
                      <Select>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lei">Lei</SelectItem>
                          <SelectItem value="jurisprudencia">Jurisprudência</SelectItem>
                          <SelectItem value="doutrina">Doutrina</SelectItem>
                          <SelectItem value="artigo">Artigo</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="Referência" className="flex-1" />
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeReferencia(index)}
                          className="text-red-500"
                        >
                          <MdDelete size={16} />
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Conclusion */}
                <div className="space-y-4">
                  <Label>Conclusão</Label>
                  <Textarea 
                    placeholder="Conclusão do parecer..." 
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