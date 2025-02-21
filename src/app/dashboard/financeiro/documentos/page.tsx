"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdAdd, MdPrint, MdSave } from "react-icons/md";

export default function DocumentosFinanceiros() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Documentos Financeiros
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Gere recibos e notas fiscais
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <Tabs defaultValue="recibo" className="w-full">
                <TabsList className="grid grid-cols-2 w-[400px] mb-6">
                  <TabsTrigger value="recibo">Recibo</TabsTrigger>
                  <TabsTrigger value="nota">Nota Fiscal</TabsTrigger>
                </TabsList>

                <TabsContent value="recibo">
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <Label>Dados do Cliente</Label>
                      <Input placeholder="Nome/Razão Social" />
                      <Input placeholder="CPF/CNPJ" />
                      <Input placeholder="Endereço" />
                    </div>

                    <div className="space-y-4">
                      <Label>Dados do Pagamento</Label>
                      <Input placeholder="Valor (R$)" />
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Forma de Pagamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dinheiro">Dinheiro</SelectItem>
                          <SelectItem value="pix">PIX</SelectItem>
                          <SelectItem value="cartao">Cartão</SelectItem>
                          <SelectItem value="transferencia">Transferência</SelectItem>
                        </SelectContent>
                      </Select>
                      <Textarea placeholder="Referente a..." />
                    </div>

                    <div className="flex gap-4">
                      <Button className="flex items-center gap-2">
                        <MdPrint size={18} />
                        Imprimir Recibo
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <MdSave size={18} />
                        Salvar
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="nota">
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <Label>Dados do Tomador</Label>
                      <Input placeholder="Nome/Razão Social" />
                      <Input placeholder="CPF/CNPJ" />
                      <Input placeholder="Endereço" />
                      <Input placeholder="Email" />
                    </div>

                    <div className="space-y-4">
                      <Label>Dados do Serviço</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo de Serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="advocacia">Serviços Advocatícios</SelectItem>
                          <SelectItem value="consultoria">Consultoria Jurídica</SelectItem>
                          <SelectItem value="parecer">Parecer Jurídico</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="Valor do Serviço (R$)" />
                      <Textarea placeholder="Descrição detalhada do serviço..." />
                    </div>

                    <div className="flex gap-4">
                      <Button className="flex items-center gap-2">
                        <MdAdd size={18} />
                        Emitir Nota Fiscal
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <MdSave size={18} />
                        Salvar Rascunho
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Documentos Recentes</h3>
              <div className="space-y-4">
                {/* Lista de documentos recentes aqui */}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}