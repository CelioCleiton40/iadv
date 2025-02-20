import { Card } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard/layout"
import { MdTrendingUp, MdAccessTime, MdPeople, MdAttachMoney } from "react-icons/md"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Bem-vindo ao seu painel de controle</p>
        </div>

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
      </div>
    </DashboardLayout>
  )
}