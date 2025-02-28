"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { MdEmail, MdPhone, MdLocationOn, MdSend } from "react-icons/md";
import { useState } from "react";
import { toast } from "sonner";

export default function Contato() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Mensagem enviada com sucesso!");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto"
        >
          {/* Informações de Contato */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 mb-4">
                Entre em Contato
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Estamos aqui para ajudar. Entre em contato conosco por qualquer um dos canais abaixo.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                    <MdEmail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base text-slate-800 dark:text-slate-200">
                      Email
                    </h3>
                    <a
                      href="mailto:contato@iadvmanager.com.br"
                      className="text-slate-600 dark:text-slate-400 hover:underline"
                    >
                      contato@iadvmanager.com.br
                    </a>
                  </div>
                </div>
              </Card>

              {/* Telefone */}
              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                    <MdPhone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base text-slate-800 dark:text-slate-200">
                      Telefone
                    </h3>
                    <a
                      href="tel:+551199999999"
                      className="text-slate-600 dark:text-slate-400 hover:underline"
                    >
                      (84) 98618-0964
                    </a>
                  </div>
                </div>
              </Card>

              {/* Endereço */}
              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                    <MdLocationOn className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base text-slate-800 dark:text-slate-200">
                      Endereço
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Av. Augusto Severo, 1436, Centro - Mossoró, RN
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Formulário de Contato */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="p-6 md:p-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome e Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Nome
                    </label>
                    <Input
                      required
                      placeholder="Seu nome"
                      className="dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="seu@email.com"
                      className="dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>
                </div>

                {/* Assunto */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Assunto
                  </label>
                  <Input
                    required
                    placeholder="Assunto da mensagem"
                    className="dark:bg-slate-700 dark:border-slate-600"
                  />
                </div>

                {/* Mensagem */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Mensagem
                  </label>
                  <Textarea
                    required
                    placeholder="Digite sua mensagem..."
                    className="min-h-[150px] dark:bg-slate-700 dark:border-slate-600"
                  />
                </div>

                {/* Botão de Envio */}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  <MdSend className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>
            </Card>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}