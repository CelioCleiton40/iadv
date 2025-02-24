"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MdArrowBack, MdSecurity, MdLock, MdShield, MdPrivacyTip } from "react-icons/md";
import Link from "next/link";

export default function SegurancaPage() {
  const sections = [
    {
      title: "Criptografia de Dados",
      icon: MdLock,
      description: "Proteção das informações sensíveis",
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-400">
            Utilizamos criptografia de ponta a ponta para garantir a segurança dos seus dados:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
            <li>Criptografia AES-256 para dados em repouso</li>
            <li>SSL/TLS para transmissão de dados</li>
            <li>Hash seguro para senhas (bcrypt)</li>
            <li>Chaves de criptografia gerenciadas em HSM</li>
          </ul>
        </div>
      )
    },
    {
      title: "Controle de Acesso",
      icon: MdShield,
      description: "Gerenciamento de permissões e autenticação",
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-400">
            Sistema robusto de controle de acesso:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
            <li>Autenticação em dois fatores (2FA)</li>
            <li>Controle granular de permissões</li>
            <li>Registro detalhado de atividades</li>
            <li>Bloqueio automático após tentativas falhas</li>
          </ul>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Recomendamos a ativação do 2FA para maior segurança da sua conta.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Backup e Recuperação",
      icon: MdSecurity,
      description: "Proteção contra perda de dados",
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-400">
            Política de backup e recuperação:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
            <li>Backups automáticos diários</li>
            <li>Retenção de 30 dias</li>
            <li>Replicação geográfica</li>
            <li>Testes regulares de recuperação</li>
          </ul>
        </div>
      )
    },
    {
      title: "Conformidade LGPD",
      icon: MdPrivacyTip,
      description: "Adequação à Lei Geral de Proteção de Dados",
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-400">
            Garantimos a conformidade com a LGPD:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
            <li>Consentimento explícito do usuário</li>
            <li>Direito à portabilidade de dados</li>
            <li>Processo de exclusão de dados</li>
            <li>Relatórios de impacto à proteção de dados</li>
          </ul>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Acesse nossa Política de Privacidade para mais detalhes sobre o tratamento de dados.
            </p>
          </div>
        </div>
      )
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
                Segurança
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Políticas e práticas de segurança do sistema
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 md:p-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg p-3 bg-red-100 dark:bg-red-900">
                        <section.icon className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                          {section.title}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">{section.content}</div>
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
              <Link href="/politica-privacidade">
                Política de Privacidade
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}