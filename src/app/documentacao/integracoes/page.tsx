"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MdArrowBack, MdCode, MdOutlineIntegrationInstructions, MdSettings, MdHelp } from "react-icons/md";
import Link from "next/link";

export default function IntegracoesPage() {
  const integrations = [
    {
      title: "Tribunais Eletrônicos",
      description: "Integração com sistemas judiciais",
      icon: MdOutlineIntegrationInstructions,
      content: (
        <div className="space-y-4">
          <p>Sistemas suportados:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>PJe - Processo Judicial Eletrônico</li>
            <li>e-SAJ - Sistema de Automação da Justiça</li>
            <li>Projudi - Processo Judicial Digital</li>
            <li>e-Proc - Processo Eletrônico</li>
          </ul>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm">Certificado digital A3 necessário para algumas integrações.</p>
          </div>
        </div>
      )
    },
    {
      title: "Sistemas de Pagamento",
      description: "Integração com gateways financeiros",
      icon: MdCode,
      content: (
        <div className="space-y-4">
          <p>Gateways disponíveis:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Stripe - Pagamentos internacionais</li>
            <li>PagSeguro - Pagamentos nacionais</li>
            <li>Mercado Pago - Soluções completas</li>
            <li>PIX - Pagamentos instantâneos</li>
          </ul>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm">Taxas e condições variam conforme o gateway escolhido.</p>
          </div>
        </div>
      )
    },
    {
      title: "Serviços de Email",
      description: "Integração com provedores de email",
      icon: MdSettings,
      content: (
        <div className="space-y-4">
          <p>Provedores suportados:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Gmail / Google Workspace</li>
            <li>Microsoft 365 / Outlook</li>
            <li>Amazon SES</li>
            <li>Servidor SMTP personalizado</li>
          </ul>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm">Configure SPF e DKIM para melhor entregabilidade.</p>
          </div>
        </div>
      )
    },
    {
      title: "Calendários Externos",
      description: "Sincronização com agendas",
      icon: MdHelp,
      content: (
        <div className="space-y-4">
          <p>Calendários compatíveis:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Google Calendar</li>
            <li>Microsoft Calendar</li>
            <li>Apple Calendar (iCal)</li>
            <li>Calendários CalDAV</li>
          </ul>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <p className="text-sm">Sincronização bidirecional disponível em todos os planos.</p>
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
                Integrações
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Conecte o iAdv Manager com outros sistemas
              </p>
            </div>
          </div>

          <Card className="p-6 md:p-8">
            <p className="text-slate-600 dark:text-slate-400">
              O iAdv Manager oferece diversas integrações com sistemas externos para 
              facilitar seu trabalho. Confira abaixo todas as possibilidades disponíveis.
            </p>
          </Card>

          <div className="space-y-6">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 md:p-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg p-3 bg-green-100 dark:bg-green-900">
                        <integration.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                          {integration.title}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">{integration.content}</div>
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
                Precisa de ajuda?
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}