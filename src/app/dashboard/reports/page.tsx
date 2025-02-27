"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MdDownload, MdBarChart, MdPieChart, MdTimeline, MdPeople } from "react-icons/md";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Relatórios</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Visualize e exporte relatórios detalhados do seu escritório
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select defaultValue="month">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Última Semana</SelectItem>
            <SelectItem value="month">Último Mês</SelectItem>
            <SelectItem value="quarter">Último Trimestre</SelectItem>
            <SelectItem value="year">Último Ano</SelectItem>
          </SelectContent>
        </Select>

        <Button className="gap-2">
          <MdDownload className="h-4 w-4" />
          Exportar Relatórios
        </Button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Processos por Status */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-100">
                Processos por Status
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Distribuição atual dos processos
              </p>
            </div>
            <MdPieChart className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
          </div>
          <div className="space-y-3 sm:space-y-4">
            {[
              { label: "Em Andamento", value: 45, color: "bg-blue-500" },
              { label: "Concluídos", value: 32, color: "bg-green-500" },
              { label: "Aguardando", value: 18, color: "bg-yellow-500" },
              { label: "Arquivados", value: 5, color: "bg-slate-500" },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{item.value}%</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Desempenho Mensal */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-100">
                Desempenho Mensal
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Casos ganhos vs. total
              </p>
            </div>
            <MdBarChart className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {[
              { month: "Janeiro", won: 85, total: 100 },
              { month: "Fevereiro", won: 92, total: 110 },
              { month: "Março", won: 88, total: 95 },
            ].map((item) => (
              <div key={item.month} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{item.month}</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {item.won}/{item.total}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: `${(item.won / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Prazos e Compromissos */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-100">
                Prazos e Compromissos
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Status de cumprimento
              </p>
            </div>
            <MdTimeline className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-xs sm:text-sm text-green-600 dark:text-green-400">No Prazo</p>
                <p className="text-xl sm:text-2xl font-bold text-green-700 dark:text-green-300">92%</p>
              </div>
              <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-xs sm:text-sm text-red-600 dark:text-red-400">Atrasados</p>
                <p className="text-xl sm:text-2xl font-bold text-red-700 dark:text-red-300">8%</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Clientes Ativos */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-100">
                Clientes Ativos
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Distribuição por área
              </p>
            </div>
            <MdPeople className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {[
              { area: "Trabalhista", count: 45, color: "bg-purple-500" },
              { area: "Civil", count: 30, color: "bg-blue-500" },
              { area: "Tributário", count: 15, color: "bg-yellow-500" },
              { area: "Outros", count: 10, color: "bg-slate-500" },
            ].map((item) => (
              <div key={item.area} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{item.area}</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{item.count}</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.count}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}