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
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Clientes
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Gerencie seus clientes e processos
            </p>
          </div>
          <Link href="/dashboard/clientes/novo">
            <Button className="flex items-center gap-2">
              <MdAdd size={18} />
              Novo Cliente
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Search and Filters */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input className="pl-10" placeholder="Buscar clientes..." />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Filtrar por:</h3>
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
          <div className="lg:col-span-3">
            <Card className="p-6">
              <Tabs defaultValue="ativos" className="w-full">
                <TabsList className="grid w-[400px] grid-cols-3 mb-6">
                  <TabsTrigger value="ativos">Ativos</TabsTrigger>
                  <TabsTrigger value="inativos">Inativos</TabsTrigger>
                  <TabsTrigger value="prospectos">Prospectos</TabsTrigger>
                </TabsList>

                <TabsContent value="ativos">
                  <div className="space-y-4">
                    {/* Client Card */}
                    <Card className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                            <MdPerson className="w-6 h-6 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">João Silva Santos</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              CPF: 123.456.789-00
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                Trabalhista
                              </span>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                3 Processos Ativos
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MdFolder className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MdEdit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            <MdDelete className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                            <MdPerson className="w-6 h-6 text-purple-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">Empresa XYZ Ltda</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              CNPJ: 12.345.678/0001-90
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                Tributário
                              </span>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                2 Processos Ativos
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MdFolder className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MdEdit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            <MdDelete className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="inativos">
                  {/* Inactive clients list */}
                </TabsContent>

                <TabsContent value="prospectos">
                  {/* Prospective clients list */}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}