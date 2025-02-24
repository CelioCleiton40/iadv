"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MdArrowBack, MdLightbulb, MdSecurity } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

export default function RecursosAvancadosPage() {
  const sections = [
    {
      title: "Relatórios Personalizados",
      description: "Crie relatórios detalhados para análise",
      content: (
        <div className="space-y-4">
          <p>Tipos de relatórios disponíveis:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Desempenho processual</li>
            <li>Análise financeira</li>
            <li>Estatísticas de casos</li>
            <li>Produtividade da equipe</li>
          </ul>
          <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <Image
              src="/tutorial/relatorios.png"
              alt="Tela de relatórios"
              width={800}
              height={400}
              className="w-full"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Integração com Tribunais",
      description: "Conexão automática com sistemas judiciais",
      content: (
        <div className="space-y-4">
          <p>Recursos de integração:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Consulta processual automática</li>
            <li>Download de documentos</li>
            <li>Acompanhamento de publicações</li>
            <li>Peticionamento eletrônico</li>
          </ul>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 p-4 rounded-lg flex items-start gap-3">
            <MdSecurity className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Todas as integrações são realizadas com certificado digital e seguem os protocolos de segurança.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Backup Automático",
      description: "Proteção e segurança dos dados",
      content: (
        <div className="space-y-4">
          <p>Características do backup:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Backup diário automático</li>
            <li>Criptografia de dados</li>
            <li>Armazenamento em nuvem</li>
            <li>Histórico de versões</li>
          </ul>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 p-4 rounded-lg flex items-start gap-3">
            <MdLightbulb className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800 dark:text-green-200">
              Configure backups extras antes de atualizações importantes no sistema.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Automação de Tarefas",
      description: "Otimize processos repetitivos",
      content: (
        <div className="space-y-4">
          <p>Recursos de automação:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modelos de documentos</li>
            <li>Agendamento automático</li>
            <li>Distribuição de tarefas</li>
            <li>Lembretes inteligentes</li>
          </ul>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-sm">
              A automação pode reduzir em até 40% o tempo gasto em tarefas administrativas.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/tutorial">
                <MdArrowBack className="h-6 w-6" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
                Recursos Avançados
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Maximize a eficiência do seu escritório com recursos avançados
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 md:p-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 font-semibold">
                        {index + 1}
                      </span>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                          {section.title}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 pl-12">{section.content}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-6">
            <Button variant="outline" asChild>
              <Link href="/tutorial">
                <MdArrowBack className="mr-2" />
                Voltar para Tutoriais
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/configuracoes">
                Configurar Recursos
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}