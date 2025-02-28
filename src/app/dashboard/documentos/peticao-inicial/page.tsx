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
import { FormData } from "@/models/FormData"
const initialFormState: FormData = {
  modelo: "",
  comarca: "",
  vara: "",
  partes: [{ nome: "", qualificacao: "" }],
  dosFatos: "",
  doDireito: "",
  dosPedidos: "",
  valorCausa: "",
};

export default function PeticaoInicial() {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  
  const [showPreview, setShowPreview] = useState(false);
  const addParte = () => {
    setFormData(prev => ({ ...prev, partes: [...prev.partes, { nome: "", qualificacao: "" }] }));
  };
  const removeParte = (index: number) => {
    setFormData(prev => ({ ...prev, partes: prev.partes.filter((_, i) => i !== index) }));
  };
  // Update form handlers
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const handleParteChange = (index: number, field: 'nome' | 'qualificacao', value: string) => {
    const newPartes = [...formData.partes];
    newPartes[index] = { ...newPartes[index], [field]: value };
    setFormData(prev => ({ ...prev, partes: newPartes }));
  };
  const handleSaveDraft = () => {
    localStorage.setItem("peticaoInicial", JSON.stringify(formData));
    setFormData(initialFormState);
    alert("Rascunho salvo com sucesso!");
  };
  // Update the PreviewPeticao component
  const PreviewPeticao = () => (
    <Dialog open={showPreview} onOpenChange={setShowPreview}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Visualização da Petição</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-4 font-serif text-slate-800 dark:text-slate-200">
          <div className="text-center space-y-4">
            <p className="uppercase">
              EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA {formData.vara} DA COMARCA DE {formData.comarca}
            </p>
          </div>

          <div className="space-y-6">
            {formData.partes.map((parte, index) => (
              <p key={index} className="indent-8">
                {parte.nome}, {parte.qualificacao}
                {index === 0 ? ", vem respeitosamente à presença de Vossa Excelência propor a presente" : ""}
              </p>
            ))}

            <p className="text-center font-bold uppercase">
              {formData.modelo || "AÇÃO"}
            </p>

            <div>
              <h2 className="font-bold uppercase mb-4">I - DOS FATOS</h2>
              <p className="indent-8 whitespace-pre-wrap">
                {formData.dosFatos || "Não especificado"}
              </p>
            </div>

            <div>
              <h2 className="font-bold uppercase mb-4">II - DO DIREITO</h2>
              <p className="indent-8 whitespace-pre-wrap">
                {formData.doDireito || "Não especificado"}
              </p>
            </div>

            <div>
              <h2 className="font-bold uppercase mb-4">III - DOS PEDIDOS</h2>
              <p className="whitespace-pre-wrap">
                {formData.dosPedidos || "Não especificado"}
              </p>
            </div>

            <p>Dá-se à causa o valor de {formData.valorCausa || "R$ 0,00"}</p>

            <div className="text-center space-y-4 mt-8">
              <p>{formData.comarca}, {new Date().toLocaleDateString()}</p>
              <p className="mt-12">_____________________________</p>
              <p>Advogado(a)</p>
              <p>OAB/XX 000.000</p>
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
                      <SelectItem value="indenizacao">
                        Ação de Indenização
                      </SelectItem>
                      <SelectItem value="obrigacao">
                        Obrigação de Fazer
                      </SelectItem>
                      <SelectItem value="despejo">Ação de Despejo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Court Information */}
                <div className="space-y-4">
                  <Label>Informações do Juízo</Label>
                  <Input 
                    placeholder="Comarca" 
                    value={formData.comarca}
                    onChange={(e) => handleInputChange('comarca', e.target.value)}
                  />
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

                  {formData.partes.map((parte, index) => (
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
                      <Input placeholder="Nome completo" 
                      value={parte.nome}
                      onChange={(e) => handleParteChange(index, 'nome', e.target.value)}
                      />
                      <Textarea placeholder="Qualificação" 
                      value={parte.qualificacao}
                      onChange={(e) => handleParteChange(index, 'qualificacao', e.target.value)}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Facts and Law */}
                <div className="space-y-4">
                  <Label>Fatos e Direito</Label>
                  <Textarea placeholder="Dos Fatos" className="min-h-[150px]" 
                  value={formData.dosFatos}
                  onChange={(e) => handleInputChange('dosFatos', e.target.value)}
                  />
                  <Textarea
                    placeholder="Do Direito"
                    className="min-h-[150px]"
                    value={formData.doDireito}
                    onChange={(e) => handleInputChange('doDireito', e.target.value)}
                  />
                </div>

                {/* Requests */}
                <div className="space-y-4">
                  <Label>Pedidos</Label>
                  <Textarea
                    placeholder="Dos Pedidos"
                    className="min-h-[150px]"
                    value={formData.dosPedidos}
                    onChange={(e) => handleInputChange('dosPedidos', e.target.value)}
                  />
                </div>

                {/* Value */}
                <div className="space-y-2">
                  <Label>Valor da Causa</Label>
                  <Input type="text" 
                    placeholder="R$ 0,00"
                    value={formData.valorCausa}
                    onChange={(e) => {
                      // Remove non-numeric characters
                      const value = e.target.value.replace(/\D/g, '');
                      
                      // Convert to number and format as BRL currency
                      if (value) {
                        const numberValue = parseInt(value, 10) / 100;
                        const formattedValue = numberValue.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        });
                        handleInputChange('valorCausa', formattedValue);
                      } else {
                        handleInputChange('valorCausa', '');
                      }
                    }} />
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
                {/* Update the Preview button */}
                <Button 
                  className="w-full flex items-center gap-2"
                  onClick={() => setShowPreview(true)}
                >
                  <MdPreview size={18} />
                  Visualizar
                </Button>

                <PreviewPeticao />
                
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={handleSaveDraft}
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
