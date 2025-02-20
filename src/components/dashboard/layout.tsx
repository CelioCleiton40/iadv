import { ReactNode } from "react"
import { MdDashboard, MdPeople, MdFolder, MdCalendarMonth, MdAttachMoney, MdDescription, MdSettings } from "react-icons/md"
import Link from "next/link"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const menuItems = [
    { icon: MdDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: MdFolder, label: "Casos", href: "/dashboard/casos" },
    { icon: MdPeople, label: "Clientes", href: "/dashboard/clientes" },
    { icon: MdCalendarMonth, label: "Agenda", href: "/dashboard/agenda" },
    { icon: MdAttachMoney, label: "Financeiro", href: "/dashboard/financeiro" },
    { icon: MdDescription, label: "Documentos", href: "/dashboard/documentos" },
  ]

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="flex h-16 items-center border-b border-slate-200 px-6 dark:border-slate-800">
          <span className="text-xl font-semibold">iAdv</span>
        </div>
        <nav className="space-y-1 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  )
}