"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdGavel, MdInfo, MdArticle, MdQuestionAnswer } from "react-icons/md";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 grid grid-rows-[20px_1fr] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-serif bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-800">
        <main className="flex flex-col gap-12 row-start-2 items-center sm:items-start text-center sm:text-left max-w-3xl w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <MdGavel size={64} className="dark:text-blue-500 text-blue-700" />
            <h1 className="text-4xl font-semibold text-slate-800 dark:text-slate-100">
              iAdv <span className="text-blue-700 dark:text-blue-500">Manager</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl font-light space-y-6 text-slate-700 dark:text-slate-200"
          >
            <p className="leading-relaxed">
              Simplifique a gestão do seu escritório de advocacia. 
              Gerencie processos, prazos, clientes e documentos em uma única plataforma 
              intuitiva e eficiente.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex gap-6 items-center flex-col sm:flex-row"
          >
            <Button
              asChild
              variant="default"
              size="lg"
              className="bg-blue-700 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all duration-300"
            >
              <Link href="/dashboard" className="flex items-center gap-2 px-8 text-lg">
                Acessar Sistema
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-blue-700 text-blue-700 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-900/20 transition-all duration-300"
            >
              <Link href="/recursos" className="flex items-center gap-2 px-8 text-lg">
                Explorar Recursos
              </Link>
            </Button>
          </motion.div>
        </main>

        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="row-start-3 flex gap-12 flex-wrap items-center justify-center text-base text-slate-600 dark:text-slate-400"
        >
          <Link
            className="flex items-center gap-2 hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300"
            href="/tutorial"
          >
            <MdInfo size={20} />
            Tutorial
          </Link>
          <Link
            className="flex items-center gap-2 hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300"
            href="/documentacao"
          >
            <MdArticle size={18} />
            Documentação
          </Link>
          <Link
            className="flex items-center gap-2 hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300"
            href="/suporte"
          >
            <MdQuestionAnswer size={18} />
            Suporte
          </Link>
        </motion.footer>
      </div>
      <Footer />
    </div>
  );
}
