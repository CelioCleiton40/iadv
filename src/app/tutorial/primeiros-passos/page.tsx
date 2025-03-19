"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MdArrowBack, MdCheckCircle } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

export default function PrimeirosPassosPage() {
  const steps = [
    {
      title: "Criar sua Conta",
      description: "Comece criando sua conta no sistema iAdv Manager",
      content: (
        <div className="space-y-4">
          <p>Para criar sua conta, você precisará:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Número da OAB válido</li>
            <li>Email profissional</li>
            <li>Documentos pessoais</li>
          </ul>
          <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <Image
              src="/tutorial/criar-conta.png"
              alt="Tela de criação de conta"
              width={800}
              height={400}
              className="w-full"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Configurar seu Perfil",
      description: "Personalize seu perfil profissional",
      content: (
        <div className="space-y-4">
          <p>Informações importantes para seu perfil:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Foto profissional</li>
            <li>Áreas de atuação</li>
            <li>Dados do escritório</li>
            <li>Informações de contato</li>
          </ul>
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <MdCheckCircle className="h-5 w-5" />
            <span>Mantenha seu perfil sempre atualizado</span>
          </div>
        </div>
      ),
    },
    {
      title: "Personalizar Dashboard",
      description: "Organize seu painel de controle",
      content: (
        <div className="space-y-4">
          <p>Personalize seu dashboard com:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Widgets relevantes</li>
            <li>Estatísticas principais</li>
            <li>Atalhos frequentes</li>
            <li>Notificações importantes</li>
          </ul>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-sm">
              Dica: Organize os elementos mais utilizados para fácil acesso
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
                Primeiros Passos
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Guia inicial para começar a usar o iAdv Manager
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 md:p-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold">
                        {index + 1}
                      </span>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                          {step.title}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 pl-12">{step.content}</div>
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}