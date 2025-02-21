"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MdSave, MdNotifications, MdPalette, MdLanguage, MdSecurity } from "react-icons/md";

export default function Configuracoes() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Configurações
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Personalize as configurações do sistema
          </p>
        </div>

        <div className="grid gap-8">
          <Card className="p-6">
            <Tabs defaultValue="geral" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="geral">Geral</TabsTrigger>
                <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
                <TabsTrigger value="aparencia">Aparência</TabsTrigger>
                <TabsTrigger value="privacidade">Privacidade</TabsTrigger>
              </TabsList>

              <TabsContent value="geral">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Idioma do Sistema</Label>
                    <Select defaultValue="pt-BR">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Fuso Horário</Label>
                    <Select defaultValue="america-sp">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-sp">América/São Paulo</SelectItem>
                        <SelectItem value="america-rj">América/Rio de Janeiro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Backup Automático</Label>
                      <p className="text-sm text-slate-600">Realizar backup diário dos dados</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notificacoes">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificações por Email</Label>
                      <p className="text-sm text-slate-600">Receber alertas por email</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificações Push</Label>
                      <p className="text-sm text-slate-600">Receber notificações no navegador</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Alertas de Prazos</Label>
                      <p className="text-sm text-slate-600">Notificar sobre prazos próximos</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="space-y-2">
                    <Label>Antecedência dos Alertas</Label>
                    <Select defaultValue="3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 dia antes</SelectItem>
                        <SelectItem value="3">3 dias antes</SelectItem>
                        <SelectItem value="7">7 dias antes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="aparencia">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Modo Compacto</Label>
                      <p className="text-sm text-slate-600">Reduzir espaçamento entre elementos</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Animações</Label>
                      <p className="text-sm text-slate-600">Habilitar animações na interface</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="privacidade">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Autenticação em Duas Etapas</Label>
                      <p className="text-sm text-slate-600">Aumentar a segurança da conta</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Histórico de Atividades</Label>
                      <p className="text-sm text-slate-600">Registrar ações no sistema</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Compartilhamento de Dados</Label>
                      <p className="text-sm text-slate-600">Permitir análise de uso anônima</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end">
              <Button>
                <MdSave className="mr-2 h-4 w-4" /> Salvar Configurações
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}