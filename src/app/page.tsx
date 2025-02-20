"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdGavel, MdInfo, MdArticle, MdQuestionAnswer } from "react-icons/md";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 grid grid-rows-[20px_1fr] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-sans bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        {/* Your existing main content */}
        <main className="flex flex-col gap-12 row-start-2 items-center sm:items-start text-center sm:text-left max-w-2xl w-full">
          {/* Logo with animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="flex items-center"
          >
            <MdGavel size={48} className="dark:text-white text-slate-800" />
          </motion.div>

          {/* Animated introduction text */}
          <motion.ol
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="list-inside list-decimal text-lg font-light space-y-4 text-slate-700 dark:text-slate-200"
          >
            <li>
              Precisa de assistência jurídica? Entre em contato conosco ou
              explore nossos serviços.
            </li>
            <li>
              Oferecemos consultoria especializada em diversas áreas do direito.
            </li>
          </motion.ol>

          {/* Animated buttons */}
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
              className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-300"
            >
              <Link href="/contato" className="flex items-center gap-2 px-8">
                Entre em Contato
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-all duration-300"
            >
              <Link href="/servicos" className="flex items-center gap-2 px-8">
                Conheça Nossos Serviços
              </Link>
            </Button>
          </motion.div>
        </main>

        {/* Animated footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="row-start-3 flex gap-8 flex-wrap items-center justify-center text-sm text-slate-600 dark:text-slate-400"
        >
          <Link
            className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
            href="/sobre"
          >
            <MdInfo size={18} />
            Sobre Nós
          </Link>
          <Link
            className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
            href="/blog"
          >
            <MdArticle size={18} />
            Blog Jurídico
          </Link>
          <Link
            className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
            href="/faq"
          >
            <MdQuestionAnswer size={18} />
            Perguntas Frequentes
          </Link>
        </motion.footer>
      </div>
      );
      <Footer />
    </div>
  );
}
