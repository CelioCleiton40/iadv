"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MdSearch, MdCode, MdApi, MdLibraryBooks, MdSecurity, MdUpdate } from "react-icons/md";
import Link from "next/link";

export default function DocumentacaoPage() {
  const sections = [
    {
      title: "Guia de API",
      description: "Documentação completa da API para integrações",
      icon: MdApi,
      color: "blue",
      topics: [
        "Autenticação e Tokens",
        "Endpoints disponíveis",
        "Exemplos de requisições",
        "Tratamento de erros"
      ]
    },
    {
      title: "Segurança",
      description: "Políticas e práticas de segurança",
      icon: MdSecurity,
      color: "red",
      topics: [
        "Criptografia de dados",
        "Controle de acesso",
        "Backup e recuperação",
        "Conformidade LGPD"
      ]
    },
    {
      title: "Integrações",
      description: "Guia de integração com sistemas externos",
      icon: MdCode,
      color: "green",
      topics: [
        "Tribunais eletrônicos",
        "Sistemas de pagamento",
        "Serviços de email",
        "Calendários externos"
      ]
    },
    {
      title: "Atualizações",
      description: "Histórico e notas de versão",
      icon: MdUpdate,
      color: "purple",
      topics: [
        "Changelog detalhado",
        "Novos recursos",
        "Correções de bugs",
        "Melhorias de performance"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">
                Documentação
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Explore a documentação completa do iAdv Manager e aprenda a aproveitar todo o potencial do sistema
              </p>
            </div>

            <div className="relative max-w-2xl mx-auto">
              <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="search"
                placeholder="Buscar na documentação..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-lg p-3 bg-${section.color}-100 dark:bg-${section.color}-900`}>
                        <section.icon className={`h-6 w-6 text-${section.color}-600 dark:text-${section.color}-400`} />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                          {section.title}
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {section.description}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-2 pl-4">
                      {section.topics.map((topic) => (
                        <li key={topic} className="text-slate-700 dark:text-slate-300 text-sm">
                          • {topic}
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full mt-4"
                    >
                      <Link href={`/documentacao/${section.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')}`}>
                        Ver Documentação
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <MdLibraryBooks className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                Precisa de ajuda?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Nossa equipe de suporte está disponível para ajudar
              </p>
              <Button asChild>
                <Link href="/suporte">Contatar Suporte</Link>
              </Button>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}