"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import {
  MdAttachMoney,
  MdTrendingUp,
  MdReceipt,
  MdPerson,
  MdCalendarToday,
  MdPieChart,
} from "react-icons/md";
import Link from "next/link";
import { EmitirNotaDialog } from "@/components/dashboard/financeiro/emitir-nota-dialog";
import { RelatorioDialog } from "@/components/dashboard/financeiro/relatorio-dialog";
import { FechamentoCaixaDialog } from "@/components/dashboard/financeiro/fechamento-caixa-dialog";

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

        {/* Summary Cards - Updated layout and styling */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8">
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/50 dark:to-green-800/30 hover:shadow-lg transition-all duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm">
                <MdAttachMoney className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Receitas
                </p>
                <h3 className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  R$ 25.450,00
                </h3>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/50 dark:to-red-800/30 hover:shadow-lg transition-all duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-sm">
                <MdReceipt className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Despesas
                </p>
                <h3 className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  R$ 8.320,00
                </h3>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/50 dark:to-blue-800/30 hover:shadow-lg transition-all duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm">
                <MdPerson className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Clientes Ativos
                </p>
                <h3 className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  32
                </h3>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/50 dark:to-purple-800/30 hover:shadow-lg transition-all duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm">
                <MdTrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Taxa de Sucesso
                </p>
                <h3 className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  85%
                </h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Update the transaction cards styling */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-xl hover:shadow-md transition-all duration-200 gap-4">
          {/* ... transaction content remains the same ... */}
        </div>

        {/* Update the side panel cards */}
        <Card className="p-4 md:p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 hover:shadow-lg transition-all duration-200">
          {/* ... card content remains the same ... */}
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
          {/* Receipts Card */}
          <Card className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <MdReceipt className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Notas Fiscais</h3>
              </div>
              <EmitirNotaDialog />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <MdReceipt className="w-4 h-4" />
                  <div>
                    <p className="font-medium">NF-e #001</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">João Silva</p>
                  </div>
                </div>
                <p className="font-medium">R$ 3.500,00</p>
              </div>
            </div>
          </Card>
          {/* Calendar Card */}
          <Card className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <MdCalendarToday className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Vencimentos Próximos</h3>
            </div>
            {/* Add calendar or due dates list */}
          </Card>

          {/* Financial Summary */}
          <Card className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <MdPieChart className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Resumo Financeiro</h3>
            </div>
            {/* Add charts or summary stats */}
          </Card>
          <Card className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <MdPieChart className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Resumo Financeiro</h3>
              </div>
              <FechamentoCaixaDialog />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <span>Saldo Atual</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">R$ 32.330,00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span>Total Entradas</span>
                <span className="font-medium text-green-600">R$ 40.650,00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span>Total Saídas</span>
                <span className="font-medium text-red-600">R$ 8.320,00</span>
              </div>
            </div>
          </Card>
          <Card className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <MdPieChart className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Relatórios</h3>
              </div>
              <div className="flex gap-2">
                <RelatorioDialog />
                <Link 
                  href="/dashboard/financeiro/relatorios" 
                  className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                >
                  Ver todos
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <MdPieChart className="w-4 h-4" />
                  <div>
                    <p className="font-medium">Relatório Mensal</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Março/2024</p>
                  </div>
                </div>
                <p className="font-medium">PDF</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
