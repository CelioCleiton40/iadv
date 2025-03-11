"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  MdEmail,
  MdPhone,
  MdWhatsapp,
  MdQuestionAnswer,
  MdSend,
  MdHelpCenter,
  MdArticle,
  MdSearch,
} from "react-icons/md";
import { faqItems } from "@/utils/faqItems";
import { useContactStore } from "@/store/useContactStore";

const SuportePage: React.FC = () => {
  const {
    name,
    email,
    message,
    searchTerm,
    isSubmitting,
    setField,
    submitForm,
    submissionError,
    resetForm,
  } = useContactStore();

  const [formStatus, setFormStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle'); // Added form status state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('idle'); // Reset form status to idle on new submit
    await submitForm();

    if (submissionError) {
      setFormStatus('error'); // Set form status to error if submissionError is true
    } else {
      setFormStatus('success'); // Set form status to success if no submissionError
      resetForm(); // Reset form only on successful submission
    }
  };

  const filteredFAQs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
              Central de Suporte
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Estamos aqui para ajudar você a aproveitar ao máximo o iAdv
              Manager. Escolha a opção que melhor atende às suas necessidades.
            </p>
          </motion.div>

          <Tabs defaultValue="contato" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="contato">Contato Direto</TabsTrigger>
              <TabsTrigger value="formulario">Formulário</TabsTrigger>
              <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
            </TabsList>

            <TabsContent value="contato">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <Card className="p-6 hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                      <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                        <MdEmail className="h-6 w-6" />
                      </div>
                      <h2 className="text-xl font-semibold">E-mail</h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Resposta em até 24 horas úteis
                    </p>
                    <br />
                    <p className="font-medium">suporte@iadvmanager.com.br</p>
                    <Button className="w-full" asChild>
                      <a href="mailto:suporte@iadvmanager.com.br">
                        Enviar e-mail
                      </a>
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
                      <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                        <MdPhone className="h-6 w-6" />
                      </div>
                      <h2 className="text-xl font-semibold">Telefone</h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Segunda a sábado, 8h às 18h
                    </p>
                    <br />
                    <p className="font-medium">(84) 98618-0964</p>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      asChild
                    >
                      <a href="tel:84986180964">Ligar agora</a>
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                      <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <MdWhatsapp className="h-6 w-6" />
                      </div>
                      <h2 className="text-xl font-semibold">WhatsApp</h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Atendimento rápido em horário comercial
                    </p>
                    <p className="font-medium">(84) 98618-0964</p>
                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      asChild
                    >
                      <a
                        href="https://wa.me/+5584986180964"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Abrir WhatsApp
                      </a>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="formulario">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-blue-600 dark:text-purple-400">
                      <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                        <MdQuestionAnswer className="h-6 w-6" />
                      </div>
                      <h2 className="text-xl font-semibold">
                        Envie sua mensagem
                      </h2>
                    </div>

                    {formStatus === 'success' ? ( // Conditionally render success message based on formStatus
                      <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-green-800 dark:text-green-200">
                          Sua mensagem foi enviada com sucesso! Entraremos em
                          contato em breve.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {formStatus === 'error' && ( // Conditionally render error message
                          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                            <p className="text-red-800 dark:text-red-200">
                              Erro ao enviar a mensagem. Por favor, tente novamente.
                            </p>
                          </div>
                        )}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Nome completo
                          </label>
                          <Input
                            value={name}
                            onChange={(e) => setField("name", e.target.value)}
                            placeholder="Seu nome"
                            required
                            disabled={isSubmitting} // Disable input during submission
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">E-mail</label>
                          <Input
                            value={email}
                            onChange={(e) => setField("email", e.target.value)}
                            type="email"
                            placeholder="seu.email@exemplo.com"
                            required
                            disabled={isSubmitting} // Disable input during submission
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Mensagem
                          </label>
                          <Textarea
                            value={message}
                            onChange={(e) =>
                              setField("message", e.target.value)
                            }
                            placeholder="Descreva sua dúvida ou problema em detalhes"
                            rows={5}
                            required
                            disabled={isSubmitting} // Disable textarea during submission
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isSubmitting} // Disable button during submission
                        >
                          <MdSend className="mr-2" /> Enviar mensagem
                        </Button>
                      </form>
                    )}
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="faq">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <Card className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
                      <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
                        <MdHelpCenter className="h-6 w-6" />
                      </div>
                      <h2 className="text-xl font-semibold">
                        Perguntas Frequentes
                      </h2>
                    </div>
                    <div className="relative">
                      <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <Input
                        placeholder="Buscar nas perguntas frequentes..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setField("searchTerm", e.target.value)}
                      />
                    </div>
                    <div className="space-y-4">
                      {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((item, index) => (
                          <div
                            key={index}
                            className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                          >
                            <h3 className="font-medium text-slate-800 dark:text-slate-200 mb-2">
                              {item.question}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                              {item.answer}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <MdArticle className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
                          <p className="mt-2 text-slate-500 dark:text-slate-400">
                            Nenhum resultado encontrado para "{searchTerm}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-800"
          >
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Base de Conhecimento
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Explore nossa documentação completa com tutoriais, guias e dicas
              para aproveitar ao máximo o iAdv Manager.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" asChild>
                <a href="/tutorial">Tutoriais</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/documentacao">Documentação</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/recursos">Recursos</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default SuportePage;