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

const pedidosComuns = [
  { id: "aviso", label: "Aviso Prévio" },
  { id: "ferias", label: "Férias + 1/3" },
  { id: "decimoterceiro", label: "13º Salário" },
  { id: "fgts", label: "FGTS + 40%" },
  { id: "verbas", label: "Verbas Rescisórias" },
  { id: "horasextras", label: "Horas Extras" },
  { id: "insalubridade", label: "Adicional de Insalubridade" },
  { id: "periculosidade", label: "Adicional de Periculosidade" },
  { id: "noturno", label: "Adicional Noturno" },
  { id: "danos", label: "Danos Morais" }
];

export default function ReclamacaoTrabalhista() {
  const [pedidos, setPedidos] = useState([{ titulo: "", fundamentacao: "", valor: "" }]);

  const addPedido = () => {
    setPedidos([...pedidos, { titulo: "", fundamentacao: "", valor: "" }]);
  };

  const removePedido = (index: number) => {
    setPedidos(pedidos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 mb-2">  Reclamação Trabalhista
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Elabore reclamações trabalhistas detalhadas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <form className="space-y-6">
                {/* Employee Information */}
                <div className="space-y-4">
                  <Label>Dados do Reclamante</Label>
                  <Input placeholder="Nome completo" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="CPF" />
                    <Input placeholder="RG" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="CTPS" />
                    <Input placeholder="PIS" />
                  </div>
                  <Input placeholder="Endereço completo" />
                </div>

                {/* Employer Information */}
                <div className="space-y-4">
                  <Label>Dados do Reclamado</Label>
                  <Input placeholder="Razão Social / Nome" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="CNPJ/CPF" />
                    <Input placeholder="Inscrição Estadual" />
                  </div>
                  <Input placeholder="Endereço completo" />
                </div>

                {/* Employment Details */}
                <div className="space-y-4">
                  <Label>Dados do Contrato</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="date" placeholder="Data de Admissão" />
                    <Input type="date" placeholder="Data de Demissão" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Cargo" />
                    <Input placeholder="Último Salário" />
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Motivo do Desligamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sem_justa">Dispensa sem Justa Causa</SelectItem>
                      <SelectItem value="com_justa">Dispensa com Justa Causa</SelectItem>
                      <SelectItem value="pedido">Pedido de Demissão</SelectItem>
                      <SelectItem value="acordo">Acordo entre as Partes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Common Claims */}
                <div className="space-y-4">
                  <Label>Pedidos Comuns</Label>
                  <Card className="p-4 bg-slate-100 dark:bg-slate-800">
                    <div className="grid grid-cols-2 gap-4">
                      {pedidosComuns.map((pedido) => (
                        <div key={pedido.id} className="flex items-center space-x-2">
                          <Checkbox id={pedido.id} />
                          <Label htmlFor={pedido.id}>{pedido.label}</Label>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Custom Claims */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Pedidos Específicos</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addPedido}
                      className="flex items-center gap-2"
                    >
                      <MdAdd size={16} />
                      Adicionar Pedido
                    </Button>
                  </div>

                  {pedidos.map((pedido, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 p-4 border rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <Label>Pedido {index + 1}</Label>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removePedido(index)}
                            className="text-red-500"
                          >
                            <MdDelete size={16} />
                          </Button>
                        )}
                      </div>
                      <Input placeholder="Título do Pedido" />
                      <Textarea 
                        placeholder="Fundamentação do pedido..." 
                        className="min-h-[100px]"
                      />
                      <Input placeholder="Valor Estimado (R$)" />
                    </motion.div>
                  ))}
                </div>

                {/* Documents */}
                <div className="space-y-4">
                  <Label>Documentos</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <MdAttachFile size={18} />
                      CTPS
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <MdAttachFile size={18} />
                      Contracheques
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <MdAttachFile size={18} />
                      Termo de Rescisão
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