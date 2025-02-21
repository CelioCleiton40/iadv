"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MdCheck } from "react-icons/md";

const plans = [
  {
    name: "Básico",
    price: "R$ 99",
    description: "Ideal para advogados autônomos",
    features: [
      "Gestão de até 50 processos",
      "Controle de prazos",
      "Gestão de clientes básica",
      "Documentos básicos",
      "Suporte por email"
    ]
  },
  {
    name: "Profissional",
    price: "R$ 199",
    description: "Perfeito para escritórios pequenos",
    popular: true,
    features: [
      "Gestão de até 200 processos",
      "Controle avançado de prazos",
      "Gestão completa de clientes",
      "Modelos de documentos",
      "Relatórios personalizados",
      "Suporte prioritário",
      "Integração com Tribunais"
    ]
  },
  {
    name: "Empresarial",
    price: "R$ 399",
    description: "Para escritórios em crescimento",
    features: [
      "Processos ilimitados",
      "Automação de documentos",
      "Gestão financeira avançada",
      "Múltiplas filiais",
      "API disponível",
      "Suporte 24/7",
      "Treinamento personalizado"
    ]
  }
];

export default function Precos() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Planos e Preços
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Escolha o plano ideal para o seu escritório
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative p-8 rounded-lg border 
                  ${plan.popular 
                    ? 'border-blue-500 shadow-lg shadow-blue-500/10' 
                    : 'border-slate-200 dark:border-slate-700'}
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                    Mais Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {plan.price}
                    <span className="text-base font-normal text-slate-600 dark:text-slate-400">/mês</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <MdCheck className="text-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600'
                  }`}
                >
                  Começar Agora
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Precisa de um plano personalizado para sua empresa?
            </p>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Entre em Contato
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}