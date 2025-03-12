"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  MdAdd,
  MdSearch,
  MdFolder,
  MdEdit,
  MdDelete,
  MdAttachFile,
  MdAccessTime,
} from "react-icons/md";

const statusCores = {
  ativo: "bg-green-100 text-green-800",
  suspenso: "bg-yellow-100 text-yellow-800",
  arquivado: "bg-gray-100 text-gray-800",
  concluido: "bg-blue-100 text-blue-800",
};

export default function Casos() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 mb-2">
              Casos
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md">
              Gerencie seus processos e casos de forma eficiente.
            </p>
          </div>
          <Link href="/dashboard/casos/novo">
            <Button className="flex items-center gap-2">
              <MdAdd size={18} />
              Novo Caso
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Search and Filters */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input className="pl-10" placeholder="Buscar casos..." />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Filtrar por:</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Área do Direito" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trabalhista">Trabalhista</SelectItem>
                    <SelectItem value="civil">Civil</SelectItem>
                    <SelectItem value="previdenciario">
                      Previdenciário
                    </SelectItem>
                    <SelectItem value="tributario">Tributário</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="suspenso">Suspenso</SelectItem>
                    <SelectItem value="arquivado">Arquivado</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Fase Processual" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inicial">Fase Inicial</SelectItem>
                    <SelectItem value="instrucao">Instrução</SelectItem>
                    <SelectItem value="recursal">Fase Recursal</SelectItem>
                    <SelectItem value="execucao">Execução</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Cases List */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <Tabs defaultValue="ativos" className="w-full">
                <TabsList className="grid w-[500px] grid-cols-4 mb-6">
                <TabsTrigger value="novosCasos">Novos Casos</TabsTrigger>
                  <TabsTrigger value="ativos">Ativos</TabsTrigger>
                  <TabsTrigger value="arquivados">Arquivados</TabsTrigger>
                  <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
                </TabsList>

                <TabsContent value="ativos">
                  <div className="space-y-4">
                    {/* Case Card */}
                    <Card className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">
                              Processo nº 1234-56.2024.5.15.0001
                            </h3>
                            <Badge className={statusCores.ativo}>Ativo</Badge>
                          </div>
                          <p className="text-sm text-slate-600">
                            Cliente: João Silva Santos
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Trabalhista</Badge>
                            <Badge variant="outline">Fase Inicial</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <MdAccessTime size={16} />
                            <span>Última atualização: 15/03/2024</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MdAttachFile className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MdEdit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500"
                          >
                            <MdDelete className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">
                              Processo nº 5678-90.2024.8.26.0000
                            </h3>
                            <Badge className={statusCores.suspenso}>
                              Suspenso
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">
                            Cliente: Empresa XYZ Ltda
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Civil</Badge>
                            <Badge variant="outline">Recursal</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <MdAccessTime size={16} />
                            <span>Última atualização: 10/03/2024</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MdAttachFile className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MdEdit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500"
                          >
                            <MdDelete className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="arquivados">
                  {/* Archived cases list */}
                </TabsContent>
                <TabsContent value="concluidos">
                  {/* Completed cases list */}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
