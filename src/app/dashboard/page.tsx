import { Card } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard/layout"
import { MdTrendingUp, MdAccessTime, MdPeople, MdAttachMoney } from "react-icons/md"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MdPerson } from "react-icons/md"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header with User Avatar */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400">Bem-vindo ao seu painel de controle</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                <div className="text-right">
                  <p className="font-medium text-slate-800 dark:text-slate-100">Dr. João Silva</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">OAB/SP 123456</p>
                </div>
                <Avatar className="h-12 w-12 ring-2 ring-offset-2 ring-slate-200 dark:ring-slate-800">
                  <AvatarImage src="/avatars/user.png" alt="Dr. João Silva" />
                  <AvatarFallback className="bg-slate-100 dark:bg-slate-800">
                    <MdPerson className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Rest of the dashboard content */}
        {/* Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                <MdAccessTime className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Casos Ativos</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">24</h3>
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
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Cases */}
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Casos Recentes</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-4 dark:border-slate-800"
                >
                  <div>
                    <h3 className="font-medium text-slate-800 dark:text-slate-100">
                      Processo #{2024000 + i}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Cliente: João Silva
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                    Em Andamento
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="p-6">
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
        <div className="grid gap-6">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
              Acompanhamento de Tribunais
            </h2>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}