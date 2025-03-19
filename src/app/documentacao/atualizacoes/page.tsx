"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MdArrowBack, MdUpdate, MdNewReleases, MdBugReport, MdSpeed } from "react-icons/md";
import Link from "next/link";

export default function AtualizacoesPage() {
  const versions = [
    {
      version: "1.0.0",
      date: "Março 2025",
      type: "major",
      icon: MdNewReleases,
      changes: [
        {
          title: "Novos Recursos",
          items: [
            "Integração com PIX",
            "Dashboard personalizado",
            "Exportação de relatórios em PDF",
            "Notificações por WhatsApp"
          ]
        },
        {
          title: "Melhorias",
          items: [
            "Interface mais intuitiva",
            "Melhor desempenho no carregamento",
            "Suporte a múltiplos idiomas",
            "Nova área de estatísticas"
          ]
        }
      ]
    },
    {
      version: "1.0.1",
      date: "Abril 2025",
      type: "patch",
      icon: MdBugReport,
      changes: [
        {
          title: "Correções",
          items: [
            "Correção na sincronização de calendário",
            "Ajuste no filtro de processos",
            "Correção no envio de emails",
            "Estabilidade geral do sistema"
          ]
        }
      ]
    },
    {
      version: "2.0.0",
      date: "Novembro 2025",
      type: "major",
      icon: MdSpeed,
      changes: [
        {
          title: "Performance",
          items: [
            "Nova arquitetura do sistema",
            "Otimização do banco de dados",
            "Melhor tempo de resposta",
            "Redução no consumo de recursos"
          ]
        },
        {
          title: "Segurança",
          items: [
            "Implementação de 2FA",
            "Novo sistema de logs",
            "Melhorias na criptografia",
            "Conformidade com LGPD"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/documentacao">
                <MdArrowBack className="h-6 w-6" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
                Atualizações
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Histórico de versões e novidades do sistema
              </p>
            </div>
          </div>

          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400">
              <MdUpdate className="h-6 w-6" />
              <p className="text-sm font-medium">Versão atual: {versions[0].version}</p>
            </div>
          </Card>

          <div className="space-y-6">
            {versions.map((version, index) => (
              <motion.div
                key={version.version}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 md:p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className={`rounded-lg p-3 
                        ${version.type === 'major' ? 'bg-purple-100 dark:bg-purple-900' : 'bg-blue-100 dark:bg-blue-900'}`}>
                        <version.icon className={`h-6 w-6 
                          ${version.type === 'major' ? 'text-purple-600 dark:text-purple-400' : 'text-blue-600 dark:text-blue-400'}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                            Versão {version.version}
                          </h2>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            • {version.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pl-16">
                      {version.changes.map((change) => (
                        <div key={change.title}>
                          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
                            {change.title}
                          </h3>
                          <ul className="list-disc pl-6 space-y-2">
                            {change.items.map((item) => (
                              <li key={item} className="text-slate-600 dark:text-slate-400">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-6">
            <Button variant="outline" asChild>
              <Link href="/documentacao">
                <MdArrowBack className="mr-2" />
                Voltar para Documentação
              </Link>
            </Button>
            <Button asChild>
              <Link href="/suporte">
                Reportar Problema
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}