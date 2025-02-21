"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

const tiposBeneficio = [
  { id: "aposentadoria_idade", label: "Aposentadoria por Idade" },
  { id: "aposentadoria_tempo", label: "Aposentadoria por Tempo de Contribuição" },
  { id: "aposentadoria_invalidez", label: "Aposentadoria por Invalidez" },
  { id: "auxilio_doenca", label: "Auxílio Doença" },
  { id: "pensao_morte", label: "Pensão por Morte" },
  { id: "bpc_loas", label: "BPC/LOAS" },
  { id: "auxilio_acidente", label: "Auxílio Acidente" }
];

export default function Previdenciario() {
  const [periodos, setPeriodos] = useState([{ inicio: "", fim: "", empresa: "", funcao: "" }]);
  const [documentos, setDocumentos] = useState([{ tipo: "", descricao: "" }]);

  const addPeriodo = () => {
    setPeriodos([...periodos, { inicio: "", fim: "", empresa: "", funcao: "" }]);
  };

  const addDocumento = () => {
    setDocumentos([...documentos, { tipo: "", descricao: "" }]);
  };

  const removePeriodo = (index: number) => {
    setPeriodos(periodos.filter((_, i) => i !== index));
  };

  const removeDocumento = (index: number) => {
    setDocumentos(documentos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Requerimento Previdenciário
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Elabore requerimentos de benefícios previdenciários
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <form className="space-y-6">
                {/* Benefit Type */}
                <div className="space-y-4">
                  <Label>Tipo de Benefício</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o benefício" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposBeneficio.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.id}>
                          {tipo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <Label>Dados do Requerente</Label>
                  <Input placeholder="Nome completo" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="CPF" />
                    <Input placeholder="RG" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Data de Nascimento" type="date" />
                    <Input placeholder="NIT/PIS/PASEP" />
                  </div>
                  <Input placeholder="Endereço completo" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Telefone" />
                    <Input placeholder="Email" />
                  </div>
                </div>

                {/* Work History */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Histórico Profissional</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addPeriodo}
                      className="flex items-center gap-2"
                    >
                      <MdAdd size={16} />
                      Adicionar Período
                    </Button>
                  </div>

                  {periodos.map((periodo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 p-4 border rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <Label>Período {index + 1}</Label>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removePeriodo(index)}
                            className="text-red-500"
                          >
                            <MdDelete size={16} />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input type="date" placeholder="Data Início" />
                        <Input type="date" placeholder="Data Fim" />
                      </div>
                      <Input placeholder="Empresa" />
                      <Input placeholder="Função/Cargo" />
                    </motion.div>
                  ))}
                </div>

                {/* Medical Information (if applicable) */}
                <div className="space-y-4">
                  <Label>Informações Médicas</Label>
                  <Textarea 
                    placeholder="Descreva a condição médica (se aplicável)..." 
                    className="min-h-[100px]"
                  />
                  <Input placeholder="CID" />
                  <Input placeholder="Data do Início da Doença/Acidente" type="date" />
                </div>

                {/* Documents */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Documentos</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addDocumento}
                      className="flex items-center gap-2"
                    >
                      <MdAdd size={16} />
                      Adicionar Documento
                    </Button>
                  </div>

                  {documentos.map((documento, index) => (
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
                          <SelectItem value="rg">RG</SelectItem>
                          <SelectItem value="cpf">CPF</SelectItem>
                          <SelectItem value="ctps">CTPS</SelectItem>
                          <SelectItem value="cnis">CNIS</SelectItem>
                          <SelectItem value="laudo">Laudo Médico</SelectItem>
                          <SelectItem value="exames">Exames</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="Descrição do documento" className="flex-1" />
                      <Button variant="outline" className="flex items-center gap-2">
                        <MdAttachFile size={18} />
                        Anexar
                      </Button>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDocumento(index)}
                          className="text-red-500"
                        >
                          <MdDelete size={16} />
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <Label>Informações Adicionais</Label>
                  <Textarea 
                    placeholder="Outras informações relevantes..." 
                    className="min-h-[100px]"
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