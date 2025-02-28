"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  MdDescription,
  MdGavel,
  MdBalance,
  MdAssignment,
  MdHandshake,
  MdArticle,
  MdWork,
  MdBusinessCenter,
  MdMail,
  MdHealthAndSafety,
  MdFolder
} from "react-icons/md";
import Link from "next/link";

const documentTools = [
  {
    icon: <MdDescription size={24} />,
    title: "Petição Inicial",
    description: "Crie petições iniciais a partir de modelos personalizáveis",
    href: "/dashboard/documentos/peticao-inicial"
  },
  {
    icon: <MdGavel size={24} />,
    title: "Contestação",
    description: "Elabore contestações com argumentos e fundamentos jurídicos",
    href: "/dashboard/documentos/contestacao"
  },
  {
    icon: <MdBalance size={24} />,
    title: "Recursos",
    description: "Gerencie recursos processuais como apelações e agravos",
    href: "/dashboard/documentos/recursos"
  },
  {
    icon: <MdAssignment size={24} />,
    title: "Procurações",
    description: "Gere procurações automatizadas com poderes personalizados",
    href: "/dashboard/documentos/procuracoes"
  },
  {
    icon: <MdHandshake size={24} />,
    title: "Acordos",
    description: "Formalize acordos e transações extrajudiciais",
    href: "/dashboard/documentos/acordos"
  },
  {
    icon: <MdArticle size={24} />,
    title: "Pareceres",
    description: "Elabore e organize pareceres jurídicos detalhados",
    href: "/dashboard/documentos/pareceres"
  },
  {
    icon: <MdWork size={24} />,
    title: "Reclamações Trabalhistas",
    description: "Crie e gerencie reclamações trabalhistas",
    href: "/dashboard/documentos/trabalhista"
  },
  {
    icon: <MdBusinessCenter size={24} />,
    title: "TRCT",
    description: "Preencha termos de rescisão conforme exigências legais",
    href: "/dashboard/documentos/trct"
  },
  {
    icon: <MdMail size={24} />,
    title: "Notificações",
    description: "Gerencie notificações extrajudiciais",
    href: "/dashboard/documentos/notificacoes"
  },
  {
    icon: <MdHealthAndSafety size={24} />,
    title: "Previdenciário",
    description: "Elabore pedidos de benefícios previdenciários",
    href: "/dashboard/documentos/previdenciario"
  },
  {
    icon: <MdFolder size={24} />,
    title: "Biblioteca",
    description: "Acesse modelos de documentos personalizáveis",
    href: "/dashboard/documentos/biblioteca"
  }
];

export default function Documentos() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-2">
  <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
    Documentos
  </h1>
  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md">
    Gerencie e crie documentos jurídicos de forma eficiente.
  </p>
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentTools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={tool.href}>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 transition-colors">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}