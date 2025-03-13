"use client";

import React from "react";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";


const ContactPage: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20">
    <Header />

    <main className="flex-grow container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 mb-4">
          Entre em Contato
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
          Estamos prontos para atender suas necessidades jurídicas. Preencha o
          formulário abaixo ou utilize um de nossos canais de comunicação.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8"
        >
          <ContactInfo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8"
        >
          <ContactForm />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 max-w-6xl mx-auto rounded-xl overflow-hidden shadow-lg"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.0498982384975!2d-37.34561372564226!3d-5.191849003932623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b289b088e5c6f3%3A0x2e4ddf17f06f67c0!2sJW%20Coworking!5e0!3m2!1spt-BR!2sbr!4v1686780000000!5m2!1spt-BR!2sbr"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização do escritório"
          className="w-full"
        ></iframe>
      </motion.div>
    </main>

    <Footer />
  </div>
);

export default ContactPage;
