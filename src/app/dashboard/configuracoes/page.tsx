"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdSave } from "react-icons/md";
import TabsGeral from "@/components/config/TabsGeral";
import TabsNotificacoes from "@/components/config/TabsNotificacoes";
import TabsAparencia from "@/components/config/TabsAparencia";
import TabsPrivacidade from "@/components/config/TabsPrivacidade";

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
          <Card className="p-1">
            <Tabs defaultValue="geral" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="geral">Geral</TabsTrigger>
                <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
                <TabsTrigger value="aparencia">Aparência</TabsTrigger>
                <TabsTrigger value="privacidade">Privacidade</TabsTrigger>
              </TabsList>

              <TabsContent value="geral">
                <TabsGeral />
              </TabsContent>
              <TabsContent value="notificacoes">
                <TabsNotificacoes />
              </TabsContent>
              <TabsContent value="aparencia">
                <TabsAparencia />
              </TabsContent>
              <TabsContent value="privacidade">
                <TabsPrivacidade />
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
