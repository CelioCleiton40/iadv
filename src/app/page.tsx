"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdGavel, MdInfo, MdArticle, MdQuestionAnswer } from "react-icons/md";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="flex-1 flex flex-col items-center justify-center text-center sm:text-left px-6 sm:px-20 py-16 gap-12">
        {/* Título Animado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="flex items-center gap-4"
        >
          <MdGavel size={64} className="text-blue-700 dark:text-blue-500" />
          <h1 className="text-5xl font-bold text-slate-800 dark:text-slate-100">
            iAdv <span className="text-blue-700 dark:text-blue-500">Manager</span>
          </h1>
        </motion.div>

        {/* Descrição Animada */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg sm:text-xl font-light text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed"
        >
          Gerencie processos, prazos, clientes e documentos em uma única plataforma 
          intuitiva e eficiente, projetada para advogados modernos.
        </motion.p>

        {/* Botões de Ação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Button
            asChild
            size="lg"
            className="bg-blue-700 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 px-8 text-lg shadow-lg"
          >
            <Link href="/precos">Conheça nossos Planos</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-blue-700 text-blue-700 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-900/20 px-8 text-lg transition-all duration-300"
          >
            <Link href="/recursos">Explorar Recursos</Link>
          </Button>
        </motion.div>
      </div>

      {/* Links do Rodapé */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="flex justify-center gap-8 flex-wrap text-base text-slate-600 dark:text-slate-400 py-8"
      >
        <Link
          className="flex items-center gap-2 hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300"
          href="/tutorial"
        >
          <MdInfo size={20} /> Tutorial
        </Link>
        <Link
          className="flex items-center gap-2 hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300"
          href="/documentacao"
        >
          <MdArticle size={18} /> Documentação
        </Link>
        <Link
          className="flex items-center gap-2 hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300"
          href="/suporte"
        >
          <MdQuestionAnswer size={18} /> Suporte
        </Link>
      </motion.footer>

      <Footer />
    </div>
  );
}
