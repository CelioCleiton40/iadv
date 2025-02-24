"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MdPlayCircle, MdBook, MdSchool, MdArrowForward } from "react-icons/md";
import Link from "next/link";

export default function TutorialPage() {
  const tutorials = [
    {
      title: "Primeiros Passos",
      description: "Aprenda a configurar sua conta e começar a usar o sistema",
      icon: MdPlayCircle,
      color: "blue",
      steps: ["Criar conta", "Configurar perfil", "Personalizar dashboard"],
    },
    {
      title: "Gestão de Processos",
      description: "Como gerenciar seus casos e acompanhar prazos",
      icon: MdBook,
      color: "green",
      steps: ["Adicionar novo caso", "Acompanhar andamentos", "Configurar alertas"],
    },
    {
      title: "Recursos Avançados",
      description: "Explore funcionalidades avançadas do sistema",
      icon: MdSchool,
      color: "purple",
      steps: ["Relatórios personalizados", "Integração com tribunais", "Backup automático"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">
              Tutorial do Sistema
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Aprenda a utilizar todos os recursos do iAdv Manager
            </p>
          </motion.div>

          <div className="grid gap-6 md:gap-8">
            {tutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className={`rounded-full p-4 bg-${tutorial.color}-100 dark:bg-${tutorial.color}-900 self-start`}>
                      <tutorial.icon className={`w-8 h-8 text-${tutorial.color}-600 dark:text-${tutorial.color}-400`} />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                          {tutorial.title}
                        </h2>
                        <p className="mt-1 text-slate-600 dark:text-slate-400">
                          {tutorial.description}
                        </p>
                      </div>
                      <div className="space-y-3">
                        {tutorial.steps.map((step, stepIndex) => (
                          <div
                            key={step}
                            className="flex items-center gap-3 text-slate-700 dark:text-slate-300"
                          >
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-sm">
                              {stepIndex + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        className="mt-4"
                      >
                        <Link href={`/tutorial/${tutorial.title.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}>
                          Ver Tutorial Completo
                          <MdArrowForward className="ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}