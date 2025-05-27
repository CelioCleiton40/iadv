"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard/layout";
import ConsultaProcessual from "@/components/dashboard/ConsultaProcessual";
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
import Link from "next/link";
import DOMPurify from 'dompurify';
import { DetalhesCompromissoDialog } from "@/components/dashboard/agenda/detalhes-compromisso-dialog";

// Função para validar URLs
const safeHref = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    if (!["https:", "mailto:", "tel:"].includes(parsedUrl.protocol)) {
      console.warn(`Link inseguro detectado: ${url}`);
      return "#"; // Fallback para links inseguros
    }
    return url;
  } catch (error) {
    console.error(`URL inválida: ${url}`, error);
    return "#"; // Fallback para URLs malformadas
  }
};

// Função para sanitizar texto dinâmico
const sanitizedText = (text: string): string => {
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(text);
  }
  return text; // ou uma string vazia "", ou outra lógica de fallback adequada
};

// ErrorBoundary para capturar erros de renderização
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <p>Desculpe, algo deu errado ao carregar o painel de controle.</p>;
    }
    return this.props.children;
  }
}

export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <DashboardLayout>
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <h1
              className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600"
              dangerouslySetInnerHTML={{
                __html: sanitizedText("Painel de Controle"),
              }}
            />
            <p
              className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md"
              dangerouslySetInnerHTML={{
                __html: sanitizedText(
                  "Bem-vindo ao seu painel de controle. Aqui você pode gerenciar seus casos, clientes e acompanhar suas atividades diárias."
                ),
              }}
            />
          </div>
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-md">
                {/* Avatar */}
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-blue-500 dark:border-blue-400">
                  <AvatarImage
                    src="/placeholder-avatar.jpg"
                    alt="Dr. João Silva"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 font-semibold">
                    JS
                  </AvatarFallback>
                </Avatar>
                {/* User Details (Hidden on Mobile) */}
                <div className="hidden sm:flex flex-col justify-center">
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
                <Link href="/dashboard/perfil">Meu Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MdSettings className="mr-2 h-4 w-4" />
                <Link href="/dashboard/configuracoes">Configurações</Link>
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
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              24
            </p>
          </Card>
          <Card className="p-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-green-100 to-white dark:from-green-900 dark:to-slate-900">
            <MdAccessTime className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
              Taxa de Sucesso
            </h3>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              85%
            </p>
          </Card>
          <Card className="p-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-purple-100 to-white dark:from-purple-900 dark:to-slate-900">
            <MdPeople className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
              Clientes
            </h3>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              156
            </p>
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
        {/* Consulta Processual */}
        <section className="mb-8">
          <ConsultaProcessual />
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
                  className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-slate-800 dark:text-slate-100">
                        Processo #{2024000 + i}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Cliente: João Silva
                      </p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Em Andamento
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          {/* Próximos Eventos */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Próximos Eventos
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                        MAR {i + 14} - Audiência
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        14:00 - Fórum Central
                      </p>
                    </div>
                    <DetalhesCompromissoDialog
                      compromisso={{
                        titulo: "Audiência Trabalhista",
                        tipo: "Audiência",
                        data: "2024-01-20",
                        horario: "09:00",
                        cliente: "João Silva",
                        processo: "1234-56.2024.5.15.0001",
                        descricao: "Audiência de instrução e julgamento",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
        {/* Tribunals Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* TRT */}
          <Card className="p-6 bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow rounded-lg">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
                TRT 15ª Região
              </h3>
              <div className="space-y-1">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-medium">Processos:</span> 12
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-medium">Próxima Audiência:</span>{" "}
                  18/03/2024
                </p>
                <p className="text-sm text-red-500">
                  <span className="font-medium">Prazos Pendentes:</span> 3
                </p>
              </div>
            </div>
          </Card>
          {/* TJSP */}
          <Card className="p-6 bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow rounded-lg">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
                TJRN
              </h3>
              <div className="space-y-1">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-medium">Processos:</span> 8
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-medium">Próxima Audiência:</span>{" "}
                  20/03/2024
                </p>
                <p className="text-sm text-red-500">
                  <span className="font-medium">Prazos Pendentes:</span> 2
                </p>
              </div>
            </div>
          </Card>
          {/* TRF */}
          <Card className="p-6 bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow rounded-lg">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
                TRF 3ª Região
              </h3>
              <div className="space-y-1">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-medium">Processos:</span> 5
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-medium">Próxima Audiência:</span>{" "}
                  22/03/2024
                </p>
                <p className="text-sm text-red-500">
                  <span className="font-medium">Prazos Pendentes:</span> 1
                </p>
              </div>
            </div>
          </Card>
        </section>
      </DashboardLayout>
    </ErrorBoundary>
  );
}