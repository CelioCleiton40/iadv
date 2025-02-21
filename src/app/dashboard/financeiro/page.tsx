"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  MdAdd,
  MdAttachMoney,
  MdTrendingUp,
  MdReceipt,
  MdPerson,
  MdCalendarToday,
  MdPieChart,
} from "react-icons/md";
import Link from "next/link";

export default function Financeiro() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Financeiro
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Gestão financeira e controle de honorários
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-green-50 dark:bg-green-900">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500 rounded-lg">
                <MdAttachMoney className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Receitas</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  R$ 25.450,00
                </h3>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-red-50 dark:bg-red-900">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500 rounded-lg">
                <MdReceipt className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Despesas</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  R$ 8.320,00
                </h3>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 dark:bg-blue-900">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500 rounded-lg">
                <MdPerson className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Clientes Ativos</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  32
                </h3>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-purple-50 dark:bg-purple-900">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500 rounded-lg">
                <MdTrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Taxa de Sucesso</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  85%
                </h3>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <Tabs defaultValue="receitas" className="w-full">
                <TabsList className="grid grid-cols-2 w-[400px] mb-6">
                  <TabsTrigger value="receitas">Receitas</TabsTrigger>
                  <TabsTrigger value="despesas">Despesas</TabsTrigger>
                </TabsList>

                <TabsContent value="receitas">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Honorários e Receitas</h3>
                      <Button className="flex items-center gap-2">
                        <MdAdd size={18} />
                        Nova Receita
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Filtrar por mês" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Janeiro</SelectItem>
                          <SelectItem value="2">Fevereiro</SelectItem>
                          {/* Add other months */}
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo de receita" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="honorarios">Honorários</SelectItem>
                          <SelectItem value="custas">Custas</SelectItem>
                          <SelectItem value="acordos">Acordos</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pago">Pago</SelectItem>
                          <SelectItem value="pendente">Pendente</SelectItem>
                          <SelectItem value="atrasado">Atrasado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Transactions List */}
                    <div className="space-y-4">
                      {/* Sample transactions */}
                      <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-green-500 rounded-lg">
                            <MdAttachMoney className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">Honorários - Processo 123</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Cliente: João Silva
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-500">R$ 3.500,00</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Pago - 15/03/2024
                          </p>
                        </div>
                      </div>

                      {/* Add more transactions */}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="despesas">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Despesas</h3>
                      <Button className="flex items-center gap-2">
                        <MdAdd size={18} />
                        Nova Despesa
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Filtrar por mês" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Janeiro</SelectItem>
                          <SelectItem value="2">Fevereiro</SelectItem>
                          {/* Add other months */}
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="custas">Custas Processuais</SelectItem>
                          <SelectItem value="escritorio">Despesas Escritório</SelectItem>
                          <SelectItem value="pessoal">Despesas Pessoais</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pago">Pago</SelectItem>
                          <SelectItem value="pendente">Pendente</SelectItem>
                          <SelectItem value="atrasado">Atrasado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Expenses List */}
                    <div className="space-y-4">
                      {/* Sample expense */}
                      <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-red-500 rounded-lg">
                            <MdReceipt className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">Custas - Processo 456</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              TJ-SP
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-red-500">R$ 850,00</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Pago - 10/03/2024
                          </p>
                        </div>
                      </div>

                      {/* Add more expenses */}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Calendar Card */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MdCalendarToday className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Vencimentos Próximos</h3>
              </div>
              {/* Add calendar or due dates list */}
            </Card>

            {/* Financial Summary */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MdPieChart className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Resumo Financeiro</h3>
              </div>
              {/* Add charts or summary stats */}
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MdPieChart className="w-5 h-5" />
                <Link href={"dashboard/financeiro/relatorios"}>ola</Link>
                <h3 className="text-lg font-semibold">Relatórios</h3>
              </div>
              {/* Add charts or summary stats */}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}