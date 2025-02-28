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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Contestacao() {
  // Add state for form data and preview
  const [formData, setFormData] = useState({
    numeroProcesso: "",
    vara: "",
    comarca: "",
    autor: "",
    reu: "",
    preliminar: "",
    fundamentacaoPreliminar: "",
    argumentos: [{ titulo: "", conteudo: "" }],
    provas: "",
    pedidos: "",
  });
  const [showPreview, setShowPreview] = useState(false);

  // Update existing handlers
  const addArgumento = () => {
    setFormData(prev => ({
      ...prev,
      argumentos: [...prev.argumentos, { titulo: "", conteudo: "" }]
    }));
  };

  const removeArgumento = (index: number) => {
    setFormData(prev => ({
      ...prev,
      argumentos: prev.argumentos.filter((_, i) => i !== index)
    }));
  };

  // Add new handlers for form inputs
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArgumentoChange = (index: number, field: string, value: string) => {
    const newArgumentos = [...formData.argumentos];
    newArgumentos[index] = { ...newArgumentos[index], [field]: value };
    setFormData(prev => ({ ...prev, argumentos: newArgumentos }));
  };

  // Add preview component
  const PreviewContestacao = () => (
    <Dialog open={showPreview} onOpenChange={setShowPreview}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Visualização da Contestação</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-4 font-serif text-slate-800 dark:text-slate-200">
          <div className="text-center space-y-4">
            <p className="uppercase font-bold">
              EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA {formData.vara || "[VARA]"} DA COMARCA DE {formData.comarca || "[COMARCA]"}
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-center">
              Processo nº {formData.numeroProcesso || "[NÚMERO DO PROCESSO]"}
            </p>

            <p className="indent-8 text-justify">
              <span className="uppercase font-bold">{formData.reu || "[RÉU]"}</span>, já qualificado nos autos do processo em epígrafe, que lhe move <span className="uppercase font-bold">{formData.autor || "[AUTOR]"}</span>, vem, respeitosamente, à presença de Vossa Excelência, por seu advogado que esta subscreve, apresentar
            </p>

            <p className="text-center font-bold uppercase my-8">
              CONTESTAÇÃO
            </p>

            {formData.preliminar && (
              <div>
                <h2 className="font-bold uppercase mb-4">I - PRELIMINARMENTE</h2>
                <h3 className="font-semibold mb-2">{formData.preliminar}</h3>
                <p className="indent-8 text-justify whitespace-pre-wrap">
                  {formData.fundamentacaoPreliminar || "Não especificado"}
                </p>
              </div>
            )}

            <div>
              <h2 className="font-bold uppercase mb-4">
                {formData.preliminar ? "II" : "I"} - DO MÉRITO
              </h2>
              
              {formData.argumentos.map((argumento, index) => (
                <div key={index} className="mb-6">
                  {argumento.titulo && (
                    <h3 className="font-semibold mb-2">{argumento.titulo}</h3>
                  )}
                  <p className="indent-8 text-justify whitespace-pre-wrap">
                    {argumento.conteudo || "Não especificado"}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-bold uppercase mb-4">
                {formData.preliminar ? "III" : "II"} - DAS PROVAS
              </h2>
              <p className="indent-8 text-justify whitespace-pre-wrap">
                {formData.provas || "Não especificado"}
              </p>
            </div>

            <div>
              <h2 className="font-bold uppercase mb-4">
                {formData.preliminar ? "IV" : "III"} - DOS PEDIDOS
              </h2>
              <p className="text-justify whitespace-pre-wrap">
                Ante o exposto, requer:
              </p>
              <div className="pl-8 mt-4 whitespace-pre-wrap">
                {formData.pedidos || "Não especificado"}
              </div>
            </div>

            <div className="text-center space-y-4 mt-12">
              <p>{formData.comarca || "[COMARCA]"}, {new Date().toLocaleDateString('pt-BR')}</p>
              <div className="mt-16">
                <p className="border-t border-slate-400 dark:border-slate-600 w-64 mx-auto pt-2">
                  Advogado(a)
                </p>
                <p>OAB/XX 000.000</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Update the form inputs to use the new state
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 mb-2">
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
                  <Input 
                    placeholder="Número do Processo" 
                    value={formData.numeroProcesso}
                    onChange={(e) => handleInputChange("numeroProcesso", e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      placeholder="Vara" 
                      value={formData.vara}
                      onChange={(e) => handleInputChange("vara", e.target.value)}
                    />
                    <Input 
                      placeholder="Comarca" 
                      value={formData.comarca}
                      onChange={(e) => handleInputChange("comarca", e.target.value)}
                    />
                  </div>
                </div>

                {/* Parties */}
                <div className="space-y-4">
                  <Label>Partes</Label>
                  <Input 
                    placeholder="Autor" 
                    value={formData.autor}
                    onChange={(e) => handleInputChange("autor", e.target.value)}
                  />
                  <Input 
                    placeholder="Réu" 
                    value={formData.reu}
                    onChange={(e) => handleInputChange("reu", e.target.value)}
                  />
                </div>

                {/* Preliminary Arguments */}
                <div className="space-y-4">
                  <Label>Preliminares</Label>
                  <Select 
                    value={formData.preliminar}
                    onValueChange={(value) => handleInputChange("preliminar", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione as preliminares" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Incompetência do Juízo",
                        "Ilegitimidade de Parte",
                        "Litispendência",
                        "Coisa Julgada",
                        "Prescrição",
                        "Decadência",
                        "Inépcia da Inicial"
                      ].map((preliminar) => (
                        <SelectItem key={preliminar} value={preliminar}>
                          {preliminar}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder="Fundamente as preliminares selecionadas"
                    className="min-h-[100px]"
                    value={formData.fundamentacaoPreliminar}
                    onChange={(e) => handleInputChange("fundamentacaoPreliminar", e.target.value)}
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

                  {formData.argumentos.map((argumento, index) => (
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
                    value={formData.provas}
                    onChange={(e) => handleInputChange("provas", e.target.value)}
                  />
                </div>

                {/* Requests */}
                <div className="space-y-4">
                  <Label>Pedidos</Label>
                  <Textarea
                    placeholder="Dos Pedidos"
                    className="min-h-[150px]"
                    value={formData.pedidos}
                    onChange={(e) => handleInputChange("pedidos", e.target.value)}
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
                <Button 
                  className="w-full flex items-center gap-2"
                  onClick={() => setShowPreview(true)}
                >
                  <MdPreview size={18} />
                  Visualizar
                </Button>
                
                <PreviewContestacao />
                
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
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
