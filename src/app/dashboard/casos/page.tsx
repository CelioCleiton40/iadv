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
        {/* Enhanced header section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="space-y-2 w-full sm:w-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 mb-2">
              Casos
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md">
              Gerencie seus processos e casos de forma eficiente.
            </p>
          </div>
          <Link href="/dashboard/casos/novo">
            <Button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              <MdAdd size={18} />
              Novo Caso
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Responsive Search and Filters */}
          <Card className="lg:sticky lg:top-24 h-fit p-4 sm:p-6">
            <div className="space-y-4">
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input className="pl-10 h-11 w-full" placeholder="Buscar casos..." />
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-slate-800 dark:text-slate-200">Filtrar por:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  <Select>
                    <SelectTrigger className="h-11 w-full">
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
                    <SelectTrigger className="h-11 w-full">
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
                    <SelectTrigger className="h-11 w-full">
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
            </div>
          </Card>

          {/* Enhanced Cases List */}
          <div className="lg:col-span-3">
            <Card className="p-4 sm:p-6">
              <Tabs defaultValue="ativos" className="w-full">
                <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 mb-6">
                  <TabsList className="w-full grid grid-cols-4 sm:grid-cols-4">
                    <TabsTrigger value="novosCasos">Novos Casos</TabsTrigger>
                    <TabsTrigger value="ativos">Ativos</TabsTrigger>
                    <TabsTrigger value="arquivados">Arquivados</TabsTrigger>
                    <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="ativos">
                  <div className="space-y-4">
                    {/* Enhanced Case Card */}
                    <Card className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="space-y-3 w-full sm:w-auto">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <h3 className="font-medium text-slate-800 dark:text-slate-200">
                              Processo nº 1234-56.2024.5.15.0001
                            </h3>
                            <Badge className={`${statusCores.ativo} whitespace-nowrap`}>Ativo</Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Cliente: João Silva Santos
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline">Trabalhista</Badge>
                            <Badge variant="outline">Fase Inicial</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <MdAccessTime size={16} />
                            <span>Última atualização: 15/03/2024</span>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto justify-end">
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                            <MdAttachFile className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Anexos</span>
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                            <MdEdit className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Editar</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 sm:flex-none text-red-500 hover:text-red-600"
                          >
                            <MdDelete className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Excluir</span>
                          </Button>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="space-y-2 w-full sm:w-auto">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-slate-800 dark:text-slate-200">
                              Processo nº 5678-90.2024.8.26.0000
                            </h3>
                            <Badge className={`${statusCores.suspenso} whitespace-nowrap`}>
                              Suspenso
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Cliente: Empresa XYZ Ltda
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline">Civil</Badge>
                            <Badge variant="outline">Recursal</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <MdAccessTime size={16} />
                            <span>Última atualização: 10/03/2024</span>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto justify-end">
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                            <MdAttachFile className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Anexos</span>
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                            <MdEdit className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Editar</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 sm:flex-none text-red-500 hover:text-red-600"
                          >
                            <MdDelete className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Excluir</span>
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