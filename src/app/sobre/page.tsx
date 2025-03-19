"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { MdSecurity, MdSpeed, MdSupport, MdAutorenew } from "react-icons/md";
import Image from "next/image";
import { MdPeople, MdTrendingUp, MdLightbulb } from "react-icons/md";

const stats = [
  { number: "1000+", label: "Escritórios Atendidos" },
  { number: "50000+", label: "Processos Gerenciados" },
  { number: "98%", label: "Satisfação dos Clientes" },
  { number: "24/7", label: "Suporte Disponível" },
];

const timeline = [
  { year: "2025", event: "Fundação do iAdv Manager" },
  { year: "2025", event: "Lançamento da primeira versão" },
  { year: "2026", event: "Expansão para todo Brasil" },
  { year: "2025", event: "Integração com tribunais" },
];

const team = [
  {
    name: "Ana Silva",
    role: "CEO & Advogada",
    image: "https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg",
    description: "Especialista em Direito Empresarial com mais de 15 anos de experiência."
  },
  {
    name: "Carlos Santos",
    role: "CTO",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    description: "Desenvolvedor full-stack com expertise em soluções jurídicas."
  },
  {
    name: "Júlia Costa",
    role: "Head de Produto",
    image: "https://images.pexels.com/photos/3727468/pexels-photo-3727468.jpeg",
    description: "Especialista em UX com foco em sistemas jurídicos."
  }
];

export default function Sobre() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section - Updated styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              Sobre o <span className="text-blue-600 dark:text-blue-400">iAdv Manager</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Transformando a gestão jurídica através da tecnologia e inovação, 
              ajudando escritórios de advocacia a alcançarem seu máximo potencial.
            </p>
          </motion.div>

          {/* Mission Section - Enhanced with hover effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-12 items-center mb-24"
          >
            <div className="relative h-[500px] rounded-xl overflow-hidden group">
              <Image
                src="https://images.pexels.com/photos/7876042/pexels-photo-7876042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Legal Tech"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/0 transition-colors duration-500" />
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100">
                Nossa Missão
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  Nascemos com o propósito de revolucionar a gestão jurídica, permitindo que advogados 
                  e escritórios foquem no que realmente importa: seus clientes e casos.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  Com anos de experiência no mercado jurídico, desenvolvemos uma solução que 
                  atende às necessidades específicas dos profissionais do direito, combinando 
                  tecnologia avançada com simplicidade de uso.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Section - New */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-white dark:bg-slate-800 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Values Section - Updated styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-24"
          >
            <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 text-center mb-12">
              Nossos Valores
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <MdSecurity className="w-12 h-12 mx-auto" />,
                  title: "Segurança",
                  description: "Proteção total dos seus dados e informações confidenciais."
                },
                {
                  icon: <MdSpeed className="w-12 h-12 mx-auto" />,
                  title: "Eficiência",
                  description: "Otimização de processos para maior produtividade."
                },
                {
                  icon: <MdSupport className="w-12 h-12 mx-auto" />,
                  title: "Suporte",
                  description: "Assistência especializada sempre que precisar."
                },
                {
                  icon: <MdAutorenew className="w-12 h-12 mx-auto" />,
                  title: "Inovação",
                  description: "Constante evolução e atualização tecnológica."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center p-8 rounded-xl border-2 border-slate-200 dark:border-slate-700
                           hover:border-blue-500 dark:hover:border-blue-500 transition-colors duration-300"
                >
                  <div className="text-blue-600 dark:text-blue-400 mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline Section - New */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-24"
          >
            <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 text-center mb-12">
              Nossa História
            </h2>
            <div className="max-w-3xl mx-auto">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start mb-8">
                  <div className="w-24 flex-shrink-0 text-xl font-bold text-blue-600 dark:text-blue-400">
                    {item.year}
                  </div>
                  <div className="flex-1 p-6 rounded-lg bg-white dark:bg-slate-800 shadow-lg">
                    {item.event}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Team Section - Updated with cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              Nossa Equipe
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-12">
              Contamos com uma equipe multidisciplinar de profissionais do direito e tecnologia, 
              trabalhando juntos para oferecer a melhor solução para seu escritório.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                      {member.name}
                    </h3>
                    <div className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                      {member.role}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}