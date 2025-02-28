"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { MdDescription, MdDownload } from "react-icons/md";
import { Button } from "@/components/ui/button";

const templates = {
  civil: [
    { name: "Ação de Cobrança", type: "doc", size: "15 KB" },
    { name: "Ação de Despejo", type: "doc", size: "18 KB" },
    { name: "Ação de Indenização", type: "doc", size: "20 KB" },
    { name: "Contestação Civil", type: "doc", size: "16 KB" },
    { name: "Recurso de Apelação", type: "doc", size: "22 KB" }
  ],
  trabalho: [
    { name: "Reclamação Trabalhista", type: "doc", size: "25 KB" },
    { name: "Acordo Trabalhista", type: "doc", size: "12 KB" },
    { name: "Contestação Trabalhista", type: "doc", size: "19 KB" },
    { name: "Recurso Ordinário", type: "doc", size: "21 KB" }
  ],
  previdenciario: [
    { name: "Aposentadoria por Idade", type: "doc", size: "17 KB" },
    { name: "Auxílio-Doença", type: "doc", size: "16 KB" },
    { name: "Pensão por Morte", type: "doc", size: "18 KB" }
  ],
  contratos: [
    { name: "Contrato de Prestação de Serviços", type: "doc", size: "23 KB" },
    { name: "Contrato de Locação", type: "doc", size: "20 KB" },
    { name: "Contrato de Compra e Venda", type: "doc", size: "19 KB" },
    { name: "Termo de Confidencialidade", type: "doc", size: "15 KB" }
  ],
  procuracoes: [
    { name: "Procuração Ad Judicia", type: "doc", size: "10 KB" },
    { name: "Procuração Ad Judicia Et Extra", type: "doc", size: "12 KB" },
    { name: "Substabelecimento", type: "doc", size: "8 KB" }
  ]
};

export default function Biblioteca() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 mb-2">  Biblioteca de Modelos
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Acesse nossa coleção de modelos jurídicos prontos para uso
          </p>
        </div>

        <Tabs defaultValue="civil" className="space-y-6">
          <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 gap-2">
            <TabsTrigger value="civil">Civil</TabsTrigger>
            <TabsTrigger value="trabalho">Trabalhista</TabsTrigger>
            <TabsTrigger value="previdenciario">Previdenciário</TabsTrigger>
            <TabsTrigger value="contratos">Contratos</TabsTrigger>
            <TabsTrigger value="procuracoes">Procurações</TabsTrigger>
          </TabsList>

          {Object.entries(templates).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((template, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            <MdDescription size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
                              {template.name}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {template.type.toUpperCase()} • {template.size}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                        >
                          <MdDownload size={20} />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}