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
import { MdAdd, MdSearch, MdPerson, MdFolder, MdEdit, MdDelete } from "react-icons/md";
import Link from "next/link";

export default function Clientes() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 mb-2">
              Clientes
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md">
      Gerencie seus clientes e processos de forma eficiente.
            </p>
          </div>
          <Link href="/dashboard/clientes/novo" className="mt-4 sm:mt-0">
            <Button className="flex items-center gap-2">
              <MdAdd size={18} />
              Novo Cliente
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search and Filters */}
          <Card className="p-4 sm:p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  className="pl-10"
                  placeholder="Buscar clientes..."
                />
              </div>

              {/* Filters */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm sm:text-base">Filtrar por:</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de Cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pessoa_fisica">Pessoa Física</SelectItem>
                    <SelectItem value="pessoa_juridica">Pessoa Jurídica</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                    <SelectItem value="prospecto">Prospecto</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Área do Direito" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trabalhista">Trabalhista</SelectItem>
                    <SelectItem value="civil">Civil</SelectItem>
                    <SelectItem value="previdenciario">Previdenciário</SelectItem>
                    <SelectItem value="tributario">Tributário</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Clients List */}
          <div className="md:col-span-3">
            <Card className="p-4 sm:p-6">
              <Tabs defaultValue="ativos" className="w-full">
                {/* Tabs List */}
                <TabsList className="flex flex-wrap w-full gap-2 mb-6">
                  <TabsTrigger value="ativos" className="flex-1 sm:flex-none">
                    Ativos
                  </TabsTrigger>
                  <TabsTrigger value="inativos" className="flex-1 sm:flex-none">
                    Inativos
                  </TabsTrigger>
                  <TabsTrigger value="prospectos" className="flex-1 sm:flex-none">
                    Prospectos
                  </TabsTrigger>
                </TabsList>

                {/* Active Clients */}
                <TabsContent value="ativos">
                  <div className="space-y-4">
                    {/* Client Card */}
                    <Card className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="flex gap-4">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                            <MdPerson className="w-6 h-6 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm sm:text-base">
                              João Silva Santos
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                              CPF: 123.456.789-00
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                Trabalhista
                              </span>
                              <span className="text-[10px] sm:text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                3 Processos Ativos
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 sm:mt-0">
                          <Button variant="outline" size="sm">
                            <MdFolder className="w-4 h-4" />
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

                    {/* Another Client Card */}
                    <Card className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="flex gap-4">
                          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                            <MdPerson className="w-6 h-6 text-purple-500" />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm sm:text-base">
                              Empresa XYZ Ltda
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                              CNPJ: 12.345.678/0001-90
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="text-[10px] sm:text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                Tributário
                              </span>
                              <span className="text-[10px] sm:text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                2 Processos Ativos
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 sm:mt-0">
                          <Button variant="outline" size="sm">
                            <MdFolder className="w-4 h-4" />
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

                {/* Inactive Clients */}
                <TabsContent value="inativos">
                  <p className="text-slate-600 dark:text-slate-400">
                    Nenhum cliente inativo encontrado.
                  </p>
                </TabsContent>

                {/* Prospective Clients */}
                <TabsContent value="prospectos">
                  <p className="text-slate-600 dark:text-slate-400">
                    Nenhum prospecto encontrado.
                  </p>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}