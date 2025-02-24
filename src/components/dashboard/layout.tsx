"use client";

import { ReactNode, useState } from "react";
import { MdDashboard, MdGavel, MdPeople, MdFolder, MdCalendarMonth, MdAttachMoney, MdDescription, MdSettings, MdMenu } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { icon: MdDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: MdFolder, label: "Casos", href: "/dashboard/casos" },
    { icon: MdPeople, label: "Clientes", href: "/dashboard/clientes" },
    { icon: MdCalendarMonth, label: "Agenda", href: "/dashboard/agenda" },
    { icon: MdAttachMoney, label: "Financeiro", href: "/dashboard/financeiro" },
    { icon: MdDescription, label: "Documentos", href: "/dashboard/documentos" },
    { icon: MdGavel, label: "Juízes", href: "/dashboard/juiz-prevento" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white dark:bg-slate-800 transform transition-all duration-300 
          ${isCollapsed ? "w-16" : "w-64"} border-r border-slate-200 dark:border-slate-700`}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-4">
            {!isCollapsed && <span className="text-lg font-bold">iAdv</span>}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="ml-auto"
            >
              <MdMenu className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 p-2 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isCollapsed ? "lg:ml-16" : "lg:ml-64"}`}>
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </div>
  );
}