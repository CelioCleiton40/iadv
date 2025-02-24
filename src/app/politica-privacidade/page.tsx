"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MdArrowBack, MdPrivacyTip } from "react-icons/md";
import Link from "next/link";

export default function PoliticaPrivacidadePage() {
  const sections = [
    {
      title: "Coleta de Dados",
      content: (
        <div className="space-y-4">
          <p>Coletamos os seguintes tipos de informações:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Dados cadastrais (nome, email, OAB)</li>
            <li>Informações dos processos</li>
            <li>Dados dos clientes</li>
            <li>Registros de acesso ao sistema</li>
          </ul>
        </div>
      )
    },
    {
      title: "Uso das Informações",
      content: (
        <div className="space-y-4">
          <p>Suas informações são utilizadas para:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Prestação dos serviços contratados</li>
            <li>Melhorias no sistema</li>
            <li>Comunicações importantes</li>
            <li>Suporte técnico</li>
          </ul>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm">Nunca compartilhamos seus dados com terceiros sem seu consentimento expresso.</p>
          </div>
        </div>
      )
    },
    {
      title: "Seus Direitos",
      content: (
        <div className="space-y-4">
          <p>De acordo com a LGPD, você tem direito a:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Acessar seus dados</li>
            <li>Corrigir informações incompletas</li>
            <li>Solicitar exclusão de dados</li>
            <li>Revogar consentimento</li>
            <li>Portabilidade dos dados</li>
          </ul>
        </div>
      )
    },
    {
      title: "Segurança",
      content: (
        <div className="space-y-4">
          <p>Medidas de segurança implementadas:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Criptografia de dados sensíveis</li>
            <li>Controle de acesso rigoroso</li>
            <li>Monitoramento contínuo</li>
            <li>Backups regulares</li>
          </ul>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm">Mantenha suas credenciais de acesso sempre seguras e atualizadas.</p>
          </div>
        </div>
      )
    },
    {
      title: "Contato",
      content: (
        <div className="space-y-4">
          <p>Para questões sobre privacidade:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email: privacidade@iadv.com</li>
            <li>Telefone: (11) 1234-5678</li>
            <li>Horário: Segunda a Sexta, 9h às 18h</li>
          </ul>
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
              <Link href="/documentacao/seguranca">
                <MdArrowBack className="h-6 w-6" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
                Política de Privacidade
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Como tratamos e protegemos seus dados
              </p>
            </div>
          </div>

          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 mb-4">
              <MdPrivacyTip className="h-6 w-6" />
              <p className="text-sm">Última atualização: Janeiro 2024</p>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Esta política descreve como o iAdv Manager coleta, usa e protege suas informações pessoais.
              Ao utilizar nosso sistema, você concorda com as práticas descritas neste documento.
            </p>
          </Card>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                    {section.title}
                  </h2>
                  <div className="text-slate-600 dark:text-slate-400">
                    {section.content}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-6">
            <Button variant="outline" asChild>
              <Link href="/documentacao/seguranca">
                <MdArrowBack className="mr-2" />
                Voltar para Segurança
              </Link>
            </Button>
            <Button asChild>
              <Link href="/suporte">
                Dúvidas? Contate o Suporte
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}