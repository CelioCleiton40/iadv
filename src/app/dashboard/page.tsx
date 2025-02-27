import { Card } from "@/components/ui/card";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/layout";
import {
  MdTrendingUp,
  MdAccessTime,
  MdPeople,
  MdAttachMoney,
  MdPerson,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Painel de Controle
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Bem-vindo ao seu painel de controle
          </p>
        </div>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt="Dr. João Silva" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  Dr. João Silva
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  OAB/SP 123456
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <MdPerson className="mr-2 h-4 w-4" />
              Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MdSettings className="mr-2 h-4 w-4" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MdLogout className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-blue-100 to-white dark:from-blue-900 dark:to-slate-900">
          <MdTrendingUp className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
            Casos Ativos
          </h3>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">24</p>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-green-100 to-white dark:from-green-900 dark:to-slate-900">
          <MdAccessTime className="w-8 h-8 text-green-500 mb-2" />
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
            Taxa de Sucesso
          </h3>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">85%</p>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-purple-100 to-white dark:from-purple-900 dark:to-slate-900">
          <MdPeople className="w-8 h-8 text-purple-500 mb-2" />
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
            Clientes
          </h3>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">156</p>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-yellow-100 to-white dark:from-yellow-900 dark:to-slate-900">
          <MdAttachMoney className="w-8 h-8 text-yellow-500 mb-2" />
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
            Faturamento Mensal
          </h3>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            R$ 45K
          </p>
        </Card>
      </section>

      {/* Recent Cases and Calendar Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Cases */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Casos Recentes
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <h3 className="font-medium text-slate-800 dark:text-slate-100">
                  Processo #{2024000 + i}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Cliente: João Silva
                </p>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  Em Andamento
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Próximos Eventos
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  MAR {i + 14} - Audiência
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  14:00 - Fórum Central
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Tribunals Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TRT */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
            TRT 15ª Região
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            12 Processos
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Próxima Audiência: 18/03/2024
          </p>
          <p className="text-sm text-red-500">
            Prazos Pendentes: 3
          </p>
        </Card>

        {/* TJSP */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
            TJSP
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            8 Processos
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Próxima Audiência: 20/03/2024
          </p>
          <p className="text-sm text-red-500">
            Prazos Pendentes: 2
          </p>
        </Card>

        {/* TRF */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
            TRF 3ª Região
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            5 Processos
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Próxima Audiência: 22/03/2024
          </p>
          <p className="text-sm text-red-500">
            Prazos Pendentes: 1
          </p>
        </Card>
      </section>
    </DashboardLayout>
  );
}