"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdSave, MdArrowBack, MdAttachFile, MdAdd, MdDelete } from "react-icons/md";
import Link from "next/link";

export default function NovoCaso() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Novo Caso
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Cadastre um novo processo
            </p>
          </div>
          <Link href="/dashboard/casos">
            <Button variant="outline" className="flex items-center gap-2">
              <MdArrowBack size={18} />
              Voltar
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <Tabs defaultValue="informacoes" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="informacoes">Informações</TabsTrigger>
                  <TabsTrigger value="partes">Partes</TabsTrigger>
                  <TabsTrigger value="documentos">Documentos</TabsTrigger>
                </TabsList>

                <TabsContent value="informacoes">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label>Número do Processo</Label>
                      <Input placeholder="Digite o número do processo" />
                    </div>

                    <div className="space-y-2">
                      <Label>Área do Direito</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a área" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trabalhista">Trabalhista</SelectItem>
                          <SelectItem value="civil">Civil</SelectItem>
                          <SelectItem value="previdenciario">Previdenciário</SelectItem>
                          <SelectItem value="tributario">Tributário</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Vara/Tribunal</Label>
                      <Input placeholder="Digite a vara ou tribunal" />
                    </div>

                    <div className="space-y-2">
                      <Label>Fase Processual</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a fase" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inicial">Fase Inicial</SelectItem>
                          <SelectItem value="instrucao">Instrução</SelectItem>
                          <SelectItem value="recursal">Fase Recursal</SelectItem>
                          <SelectItem value="execucao">Execução</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Data de Distribuição</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>Valor da Causa</Label>
                        <Input placeholder="R$ 0,00" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Objeto da Ação</Label>
                      <Textarea 
                        placeholder="Descreva o objeto da ação..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="partes">
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <Label>Parte Autora</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cliente1">João Silva Santos</SelectItem>
                          <SelectItem value="cliente2">Maria Oliveira</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label>Parte Ré</Label>
                      <Input placeholder="Nome da parte ré" />
                      <Input placeholder="CPF/CNPJ da parte ré" />
                      <Textarea 
                        placeholder="Endereço da parte ré"
                        className="min-h-[80px]"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Advogado(s) Contrário(s)</Label>
                      <Input placeholder="Nome do advogado" />
                      <Input placeholder="OAB" />
                      <Input placeholder="Email/Telefone" />
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="documentos">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <Label>Documentos Essenciais</Label>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <MdAdd size={16} />
                        Adicionar Documento
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <Card className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <MdAttachFile size={20} className="text-blue-500" />
                            <div>
                              <p className="font-medium">Petição Inicial</p>
                              <p className="text-sm text-slate-500">PDF - 2.5MB</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <MdDelete size={18} />
                          </Button>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <MdAttachFile size={20} className="text-blue-500" />
                            <div>
                              <p className="font-medium">Procuração</p>
                              <p className="text-sm text-slate-500">PDF - 1.2MB</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <MdDelete size={18} />
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Ações</h3>
              <div className="space-y-4">
                <Button className="w-full flex items-center gap-2">
                  <MdSave size={18} />
                  Salvar Caso
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}