"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdGavel, MdInfo, MdArticle, MdQuestionAnswer, MdSpeed, MdSecurity, MdAutoGraph } from "react-icons/md";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      icon: <MdSpeed className="h-8 w-8 text-blue-600" />,
      title: "Agilidade",
      description: "Reduza o tempo gasto em tarefas administrativas em até 70%"
    },
    {
      icon: <MdSecurity className="h-8 w-8 text-blue-600" />,
      title: "Segurança",
      description: "Seus dados protegidos com criptografia de ponta a ponta"
    },
    {
      icon: <MdAutoGraph className="h-8 w-8 text-blue-600" />,
      title: "Produtividade",
      description: "Aumente sua eficiência com automação inteligente"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 dark:bg-blue-900/20 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-32">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", duration: 0.8 }}
                >
                  <h1>
                    <span className="block text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                      Revolucione seu escritório
                    </span>
                    <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                      <span className="text-slate-800 dark:text-white">iAdv </span>
                      <span className="text-blue-700 dark:text-blue-500">Manager</span>
                    </span>
                  </h1>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="mt-6 text-lg text-slate-700 dark:text-slate-300 sm:mt-8"
                >
                  A plataforma completa para advogados que buscam excelência. 
                  Gerencie processos, prazos, clientes e documentos com inteligência 
                  e eficiência em uma única solução.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start"
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-blue-700 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 px-8 text-lg shadow-lg"
                  >
                    <Link href="/precos">Comece Agora</Link>
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
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="mt-6 flex items-center gap-2 justify-center lg:justify-start"
                >
                  <div className="flex -space-x-1 overflow-hidden">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-800 bg-blue-${i*100 + 200}`}>
                        <span className="sr-only">User {i}</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Mais de 2.000 advogados já utilizam
                  </span>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
              >
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <div className="relative block w-full bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 w-full h-full flex flex-col">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="flex-1 grid grid-cols-3 gap-2">
                            <div className="bg-white/20 rounded"></div>
                            <div className="col-span-2 bg-white/20 rounded"></div>
                            <div className="col-span-2 bg-white/20 rounded"></div>
                            <div className="bg-white/20 rounded"></div>
                            <div className="col-span-3 bg-white/20 rounded h-20"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                      <svg className="h-20 w-20 text-blue-500" fill="currentColor" viewBox="0 0 84 84">
                        <circle opacity="0.9" cx="42" cy="42" r="42" fill="white" />
                        <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="py-16 bg-white dark:bg-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white sm:text-4xl">
              Por que escolher o iAdv Manager?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400">
              Desenvolvido por advogados para advogados
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.2, duration: 0.6 }}
                className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="bg-blue-700 dark:bg-blue-800"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Pronto para transformar seu escritório?</span>
            <span className="block text-blue-200">Experimente gratuitamente por 14 dias.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 px-8 text-lg"
              >
                <Link href="/cadastro">Começar Agora</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-wider uppercase">Depoimentos</span>
            <h2 className="mt-2 text-4xl font-extrabold text-slate-800 dark:text-white">
              O que dizem nossos clientes
            </h2>
            <div className="mt-4 max-w-3xl mx-auto">
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Histórias reais de advogados que transformaram seus escritórios com o iAdv Manager
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote: "O iAdv Manager revolucionou a gestão do meu escritório. Economizo horas todos os dias com a automação de tarefas repetitivas.",
                author: "Dra. Maria Silva",
                role: "Advogada Tributarista",
                rating: 5
              },
              {
                quote: "A melhor solução para gestão de processos que já utilizei. Interface intuitiva e suporte excepcional quando precisei de ajuda.",
                author: "Dr. João Santos",
                role: "Sócio de Escritório",
                rating: 5
              },
              {
                quote: "Desde que implementamos o iAdv Manager, nunca mais perdemos um prazo processual. A ferramenta é indispensável para nosso escritório.",
                author: "Dra. Ana Costa",
                role: "Advogada Trabalhista",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 dark:bg-blue-500/20 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform"></div>
                <div className="flex flex-col h-full relative">
                  <div className="mb-6">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">"{testimonial.quote}"</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                          {testimonial.author.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-slate-800 dark:text-white">{testimonial.author}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="max-w-3xl mx-auto text-center bg-blue-600 dark:bg-blue-700 rounded-2xl p-8 sm:p-12 shadow-xl"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Receba nossas novidades
            </h3>
            <p className="text-blue-100 mb-8">
              Fique por dentro das últimas atualizações, dicas e recursos para otimizar seu escritório
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-6 py-1 rounded-xl text-slate-800 dark:text-white bg-white dark:bg-slate-800 border-2 border-transparent focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none"
              />
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 px-8">
                Inscrever-se
              </Button>
            </form>
            <p className="text-sm text-blue-100 mt-4">
              Você pode cancelar sua inscrição a qualquer momento
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Links do Rodapé */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
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
      </motion.div>

      <Footer />
    </div>
  );
}