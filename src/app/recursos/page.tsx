"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  MdDescription, 
  MdAccessTime, 
  MdPeople, 
  MdAttachMoney,
  MdInsertDriveFile,
  MdNotifications
} from "react-icons/md";

const features = [
  {
    icon: <MdDescription size={32} />,
    title: "Gestão de Processos",
    description: "Acompanhe todos os seus processos em tempo real, com atualizações automáticas e organização intuitiva."
  },
  {
    icon: <MdAccessTime size={32} />,
    title: "Controle de Prazos",
    description: "Sistema inteligente de alertas e lembretes para nunca perder um prazo processual importante."
  },
  {
    icon: <MdPeople size={32} />,
    title: "Gestão de Clientes",
    description: "Mantenha todos os dados dos clientes organizados e acessíveis, com histórico completo de interações."
  },
  {
    icon: <MdAttachMoney size={32} />,
    title: "Controle Financeiro",
    description: "Gerencie honorários, despesas e faturamento de forma simplificada e integrada."
  },
  {
    icon: <MdInsertDriveFile size={32} />,
    title: "Documentos Inteligentes",
    description: "Modelos personalizáveis e sistema avançado de gestão documental com versionamento."
  },
  {
    icon: <MdNotifications size={32} />,
    title: "Notificações Automáticas",
    description: "Receba alertas importantes sobre seus processos, prazos e compromissos."
  }
];

export default function Recursos() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Recursos do iAdv Manager
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Ferramentas poderosas para transformar a gestão do seu escritório de advocacia
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Pronto para começar?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Experimente o iAdv Manager gratuitamente por 14 dias
            </p>
            <a
              href="/register"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Começar Agora
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}