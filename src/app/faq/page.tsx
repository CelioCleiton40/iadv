"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MdQuestionAnswer } from "react-icons/md";
import { motion } from "framer-motion";

const faqItems = [
  {
    question: "Como funciona o período de teste gratuito?",
    answer: "Oferecemos 14 dias de teste gratuito com acesso a todas as funcionalidades da plataforma. Não é necessário cartão de crédito para começar."
  },
  {
    question: "Quais são os planos disponíveis?",
    answer: "Temos planos para profissionais individuais e escritórios de diferentes portes. Os preços variam de acordo com o número de usuários e recursos necessários."
  },
  {
    question: "Como posso migrar meus dados para o iAdv?",
    answer: "Oferecemos suporte completo para migração de dados, incluindo importação de processos, clientes e documentos. Nossa equipe técnica auxiliará em todo o processo."
  },
  {
    question: "O sistema é seguro?",
    answer: "Sim, utilizamos criptografia de ponta a ponta e seguimos rigorosos protocolos de segurança para proteger seus dados. Realizamos backups diários e atendemos a LGPD."
  },
  {
    question: "Posso acessar de qualquer dispositivo?",
    answer: "Sim, o iAdv é uma plataforma web responsiva, acessível de qualquer dispositivo com conexão à internet, incluindo smartphones e tablets."
  },
  {
    question: "Como funciona o suporte técnico?",
    answer: "Oferecemos suporte por chat, email e telefone em horário comercial. Clientes dos planos premium têm acesso a suporte prioritário 24/7."
  },
  {
    question: "É possível personalizar documentos e relatórios?",
    answer: "Sim, disponibilizamos modelos editáveis e a opção de criar templates personalizados para petições, contratos e relatórios."
  },
  {
    question: "Como são feitas as atualizações do sistema?",
    answer: "As atualizações são automáticas e regulares, sem custo adicional. Novos recursos são adicionados mensalmente com base no feedback dos usuários."
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
              <MdQuestionAnswer className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
              Perguntas Frequentes
            </h1>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre o iAdv Manager
          </p>
        </motion.div>

        <Card className="p-4 md:p-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="border border-slate-200 dark:border-slate-700 rounded-lg mb-4 overflow-hidden"
                >
                  <AccordionTrigger className="text-left text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 p-4 md:p-6 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <span className="text-sm md:text-base font-medium">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 p-4 md:p-6 text-sm md:text-base leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 md:mt-12 text-center"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Não encontrou o que procurava?{" "}
            <a href="/suporte" className="text-blue-600 dark:text-blue-400 hover:underline">
              Entre em contato com nosso suporte
            </a>
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}