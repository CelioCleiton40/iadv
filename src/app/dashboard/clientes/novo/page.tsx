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
import { MdSave, MdArrowBack } from "react-icons/md";
import Link from "next/link";

export default function NovoCliente() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Novo Cliente
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Cadastre um novo cliente
            </p>
          </div>
          <Link href="/dashboard/clientes">
            <Button variant="outline" className="flex items-center gap-2">
              <MdArrowBack size={18} />
              Voltar
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <Tabs defaultValue="dados_pessoais" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="dados_pessoais">Dados Pessoais</TabsTrigger>
                  <TabsTrigger value="contato">Contato</TabsTrigger>
                  <TabsTrigger value="processos">Processos</TabsTrigger>
                </TabsList>

                <TabsContent value="dados_pessoais">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label>Tipo de Cliente</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pf">Pessoa Física</SelectItem>
                          <SelectItem value="pj">Pessoa Jurídica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Nome Completo / Razão Social</Label>
                      <Input placeholder="Digite o nome completo ou razão social" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>CPF/CNPJ</Label>
                        <Input placeholder="Digite o CPF ou CNPJ" />
                      </div>
                      <div className="space-y-2">
                        <Label>RG/IE</Label>
                        <Input placeholder="Digite o RG ou Inscrição Estadual" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Data de Nascimento / Fundação</Label>
                      <Input type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label>Estado Civil</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado civil" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                          <SelectItem value="casado">Casado(a)</SelectItem>
                          <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                          <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="contato">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label>Endereço</Label>
                      <Input placeholder="Logradouro" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Número</Label>
                        <Input placeholder="Número" />
                      </div>
                      <div className="space-y-2">
                        <Label>Complemento</Label>
                        <Input placeholder="Complemento" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Bairro</Label>
                        <Input placeholder="Bairro" />
                      </div>
                      <div className="space-y-2">
                        <Label>CEP</Label>
                        <Input placeholder="CEP" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Cidade</Label>
                        <Input placeholder="Cidade" />
                      </div>
                      <div className="space-y-2">
                        <Label>Estado</Label>
                        <Input placeholder="Estado" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Telefone</Label>
                        <Input placeholder="Telefone" />
                      </div>
                      <div className="space-y-2">
                        <Label>Celular</Label>
                        <Input placeholder="Celular" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="Email" />
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="processos">
                  <form className="space-y-4">
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
                      <Label>Observações</Label>
                      <Textarea 
                        placeholder="Informações adicionais sobre o cliente ou processo"
                        className="min-h-[150px]"
                      />
                    </div>
                  </form>
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
                  Salvar Cliente
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}