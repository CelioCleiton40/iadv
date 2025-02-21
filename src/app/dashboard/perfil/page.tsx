"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdPerson, MdEdit, MdSave, MdLock } from "react-icons/md";

export default function Perfil() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Meu Perfil
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Gerencie suas informações pessoais e profissionais
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Summary */}
          <Card className="p-6 lg:col-span-1">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-32 w-32 ring-4 ring-offset-4 ring-slate-200 dark:ring-slate-800">
                <AvatarImage src="/avatars/user.png" alt="Dr. João Silva" />
                <AvatarFallback className="bg-slate-100 dark:bg-slate-800">
                  <MdPerson className="h-16 w-16 text-slate-600 dark:text-slate-400" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  Dr. João Silva
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">OAB/SP 123456</p>
              </div>
              <Button variant="outline" className="w-full">
                <MdEdit className="mr-2 h-4 w-4" /> Alterar Foto
              </Button>
            </div>
          </Card>

          {/* Profile Details */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <Tabs defaultValue="dados_pessoais" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="dados_pessoais">Dados Pessoais</TabsTrigger>
                  <TabsTrigger value="profissional">Dados Profissionais</TabsTrigger>
                  <TabsTrigger value="seguranca">Segurança</TabsTrigger>
                </TabsList>

                <TabsContent value="dados_pessoais">
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome Completo</Label>
                        <Input defaultValue="João Silva" />
                      </div>
                      <div className="space-y-2">
                        <Label>CPF</Label>
                        <Input defaultValue="123.456.789-00" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" defaultValue="joao.silva@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label>Telefone</Label>
                        <Input defaultValue="(11) 99999-9999" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Data de Nascimento</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>Estado Civil</Label>
                        <Input defaultValue="Casado" />
                      </div>
                    </div>

                    <Button className="w-full mt-6">
                      <MdSave className="mr-2 h-4 w-4" /> Salvar Alterações
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="profissional">
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Número OAB</Label>
                        <Input defaultValue="123456" />
                      </div>
                      <div className="space-y-2">
                        <Label>Seccional</Label>
                        <Input defaultValue="SP" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Áreas de Atuação</Label>
                      <Input defaultValue="Direito Civil, Trabalhista, Previdenciário" />
                    </div>

                    <div className="space-y-2">
                      <Label>Escritório</Label>
                      <Input defaultValue="Silva Advogados Associados" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Data de Inscrição OAB</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>Situação</Label>
                        <Input defaultValue="Regular" />
                      </div>
                    </div>

                    <Button className="w-full mt-6">
                      <MdSave className="mr-2 h-4 w-4" /> Salvar Alterações
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="seguranca">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label>Senha Atual</Label>
                      <Input type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label>Nova Senha</Label>
                      <Input type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label>Confirmar Nova Senha</Label>
                      <Input type="password" />
                    </div>

                    <Button className="w-full mt-6">
                      <MdLock className="mr-2 h-4 w-4" /> Alterar Senha
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}