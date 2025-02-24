import { Card } from "@/components/ui/card"
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/layout"
import { MdTrendingUp, MdAccessTime, MdPeople, MdAttachMoney } from "react-icons/md"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MdPerson, MdSettings, MdLogout } from "react-icons/md"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        {/* Header with User Avatar */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between sm:items-center">
          <div className="mt-4 sm:mt-0">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">Dashboard</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">Bem-vindo ao seu painel de controle</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 sm:gap-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all duration-200 hover:shadow-md">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Dr. João Silva</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">OAB/SP 123456</p>
                </div>
                <Avatar className="h-9 w-9 sm:h-12 sm:w-12 ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400 transition-transform hover:scale-105">
                  <AvatarImage src="/avatars/user.png" alt="Dr. João Silva" className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700">
                    <MdPerson className="h-5 w-5 text-white" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2">
              <DropdownMenuItem className="sm:hidden font-medium p-3">Dr. João Silva</DropdownMenuItem>
              <DropdownMenuItem asChild className="p-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                <Link href="/dashboard/perfil" className="flex items-center">
                  <MdPerson className="mr-2 h-4 w-4" />
                  Meu Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="p-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                <Link href="/dashboard/configuracoes" className="flex items-center">
                  <MdSettings className="mr-2 h-4 w-4" />
                  Configurações
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 p-3 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md flex items-center">
                <MdLogout className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <Card className="p-3 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="rounded-full bg-blue-100 p-2 sm:p-3 dark:bg-blue-900">
                <MdAccessTime className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Casos Ativos</p>
                <h3 className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-slate-100">24</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                <MdTrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Taxa de Sucesso</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">85%</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                <MdPeople className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Clientes</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">156</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-900">
                <MdAttachMoney className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Faturamento Mensal</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">R$ 45K</h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Cases and Calendar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="p-3 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
              Casos Recentes
            </h2>
            <div className="space-y-2 sm:space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-slate-200 p-2 sm:p-4 dark:border-slate-800"
                >
                  <div>
                    <h3 className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-100">
                      Processo #{2024000 + i}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Cliente: João Silva
                    </p>
                  </div>
                  <span className="self-start sm:self-auto rounded-full bg-blue-100 px-2 py-1 text-xs sm:text-sm text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                    Em Andamento
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="p-4 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Próximos Eventos</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-lg border border-slate-200 p-4 dark:border-slate-800"
                >
                  <div className="rounded-lg bg-slate-100 p-3 text-center dark:bg-slate-800">
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400">MAR</div>
                    <div className="text-xl font-bold text-slate-800 dark:text-slate-100">{i + 14}</div>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-slate-100">Audiência</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      14:00 - Fórum Central
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Tribunals Section */}
        <div className="grid gap-4">
          <Card className="p-3 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
              Acompanhamento de Tribunais
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* TRT */}
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-slate-800 dark:text-slate-100">TRT 15ª Região</h3>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-600 dark:bg-green-900 dark:text-green-400">
                    12 Processos
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Próxima Audiência: 18/03/2024
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Prazos Pendentes: 3
                  </p>
                </div>
              </div>
              {/* TJSP */}
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-slate-800 dark:text-slate-100">TJSP</h3>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                    8 Processos
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Próxima Audiência: 20/03/2024
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Prazos Pendentes: 2
                  </p>
                </div>
              </div>
              {/* TRF */}
              <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-slate-800 dark:text-slate-100">TRF 3ª Região</h3>
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600 dark:bg-purple-900 dark:text-purple-400">
                    5 Processos
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Próxima Audiência: 22/03/2024
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Prazos Pendentes: 1
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}