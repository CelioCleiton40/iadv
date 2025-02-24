"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MdArrowBack, MdLightbulb, MdWarning } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

export default function GestaoProcessosPage() {
  const sections = [
    {
      title: "Adicionar Novo Caso",
      description: "Como cadastrar e organizar novos processos",
      content: (
        <div className="space-y-4">
          <p>Informações necessárias para cadastro:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Número do processo</li>
            <li>Tribunal/Vara</li>
            <li>Tipo de ação</li>
            <li>Partes envolvidas</li>
            <li>Data de distribuição</li>
          </ul>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 p-4 rounded-lg flex items-start gap-3">
            <MdLightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Mantenha os documentos digitalizados organizados por pastas para facilitar o acesso.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Acompanhamento Processual",
      description: "Monitore o andamento dos seus processos",
      content: (
        <div className="space-y-4">
          <p>Recursos disponíveis:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Linha do tempo do processo</li>
            <li>Notificações automáticas</li>
            <li>Integração com tribunais</li>
            <li>Gestão de documentos</li>
            <li>Controle de prazos</li>
          </ul>
          <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <Image
              src="/tutorial/acompanhamento.png"
              alt="Tela de acompanhamento processual"
              width={800}
              height={400}
              className="w-full"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Configuração de Alertas",
      description: "Personalize suas notificações",
      content: (
        <div className="space-y-4">
          <p>Tipos de alertas disponíveis:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Prazos processuais</li>
            <li>Publicações no diário</li>
            <li>Movimentações importantes</li>
            <li>Audiências agendadas</li>
          </ul>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 p-4 rounded-lg flex items-start gap-3">
            <MdWarning className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800 dark:text-red-200">
              Configure sempre um prazo de segurança para evitar perdas de prazos importantes.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Relatórios e Estatísticas",
      description: "Análise do desempenho processual",
      content: (
        <div className="space-y-4">
          <p>Informações disponíveis:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Taxa de sucesso</li>
            <li>Tempo médio de processos</li>
            <li>Distribuição por área</li>
            <li>Análise financeira</li>
          </ul>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-sm">
              Os relatórios podem ser exportados em diversos formatos para apresentação.
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
                Gestão de Processos
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Aprenda a gerenciar seus processos de forma eficiente
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
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 font-semibold">
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
              <Link href="/dashboard/casos">
                Ir para Gestão de Casos
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}