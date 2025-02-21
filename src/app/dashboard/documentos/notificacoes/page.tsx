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

const tiposNotificacao = [
  { id: "extrajudicial", label: "Notificação Extrajudicial" },
  { id: "cobranca", label: "Notificação de Cobrança" },
  { id: "rescisao", label: "Notificação de Rescisão" },
  { id: "advertencia", label: "Notificação de Advertência" },
  { id: "intimacao", label: "Intimação" }
];

const meiosEnvio = [
  { id: "correios_ar", label: "Correios com AR" },
  { id: "cartorio", label: "Cartório" },
  { id: "email", label: "E-mail" },
  { id: "pessoal", label: "Entrega Pessoal" },
  { id: "whatsapp", label: "WhatsApp" }
];

export default function Notificacoes() {
  const [anexos, setAnexos] = useState([{ descricao: "" }]);

  const addAnexo = () => {
    setAnexos([...anexos, { descricao: "" }]);
  };

  const removeAnexo = (index: number) => {
    setAnexos(anexos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Notificação
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Elabore e gerencie notificações e intimações
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <form className="space-y-6">
                {/* Notification Type */}
                <div className="space-y-4">
                  <Label>Tipo de Notificação</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposNotificacao.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.id}>
                          {tipo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sender Information */}
                <div className="space-y-4">
                  <Label>Dados do Notificante</Label>
                  <Input placeholder="Nome completo / Razão Social" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="CPF/CNPJ" />
                    <Input placeholder="RG/IE" />
                  </div>
                  <Input placeholder="Endereço completo" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Telefone" />
                    <Input placeholder="Email" />
                  </div>
                </div>

                {/* Recipient Information */}
                <div className="space-y-4">
                  <Label>Dados do Notificado</Label>
                  <Input placeholder="Nome completo / Razão Social" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="CPF/CNPJ" />
                    <Input placeholder="RG/IE" />
                  </div>
                  <Input placeholder="Endereço completo" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Telefone" />
                    <Input placeholder="Email" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <Label>Conteúdo da Notificação</Label>
                  <Input placeholder="Assunto" />
                  <Textarea 
                    placeholder="Texto da notificação..." 
                    className="min-h-[200px]"
                  />
                </div>

                {/* Delivery Method */}
                <div className="space-y-4">
                  <Label>Forma de Envio</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a forma de envio" />
                    </SelectTrigger>
                    <SelectContent>
                      {meiosEnvio.map((meio) => (
                        <SelectItem key={meio.id} value={meio.id}>
                          {meio.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Deadlines */}
                <div className="space-y-4">
                  <Label>Prazos</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="date" placeholder="Data de Envio" />
                    <Input type="number" placeholder="Prazo em dias" />
                  </div>
                </div>

                {/* Attachments */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Anexos</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addAnexo}
                      className="flex items-center gap-2"
                    >
                      <MdAdd size={16} />
                      Adicionar Anexo
                    </Button>
                  </div>

                  {anexos.map((anexo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-4"
                    >
                      <Input placeholder="Descrição do anexo" className="flex-1" />
                      <Button variant="outline" className="flex items-center gap-2">
                        <MdAttachFile size={18} />
                        Anexar
                      </Button>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAnexo(index)}
                          className="text-red-500"
                        >
                          <MdDelete size={16} />
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Additional Notes */}
                <div className="space-y-4">
                  <Label>Observações</Label>
                  <Textarea 
                    placeholder="Observações adicionais..." 
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