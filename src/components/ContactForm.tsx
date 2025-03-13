"use client";

import React, { useCallback, useState } from "react";
import { useContactStore } from "@/store/useContactStore";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MdSend, MdPerson, MdEmail, MdMessage } from "react-icons/md";
import { z } from "zod";

// Esquema de validação com Zod
const contactSchema = z.object({
  name: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres"),
  email: z.string().email("Digite um e-mail válido"),
  message: z.string().min(10, "A mensagem precisa ter pelo menos 10 caracteres"),
});

const ContactForm: React.FC = () => {
  const { name, email, message, isSubmitting, setField, submitForm } = useContactStore();
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validação com Zod
      const result = contactSchema.safeParse({ name, email, message });

      if (!result.success) {
        // Se houver erros, atualiza o estado
        const fieldErrors = result.error.flatten().fieldErrors;
        setErrors({
          name: fieldErrors.name?.[0],
          email: fieldErrors.email?.[0],
          message: fieldErrors.message?.[0],
        });
        return;
      }

      setErrors({}); // Limpa erros antes do envio
      await submitForm();
    },
    [name, email, message, submitForm]
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Envie sua mensagem
      </h2>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        {/* Nome */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Nome
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
              <MdPerson className="w-5 h-5" />
            </div>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setField("name", e.target.value)}
              required
              autoComplete="name"
              placeholder="Seu nome completo"
              className="pl-10 h-11 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
              <MdEmail className="w-5 h-5" />
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setField("email", e.target.value)}
              required
              autoComplete="email"
              placeholder="seu.email@exemplo.com"
              className="pl-10 h-11 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Mensagem */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium">
            Mensagem
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-slate-400">
              <MdMessage className="w-5 h-5" />
            </div>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setField("message", e.target.value)}
              required
              autoComplete="off"
              placeholder="Descreva como podemos ajudar você..."
              className="pl-10 min-h-[150px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>

        {/* Botão de Envio */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <MdSend className="mr-2 h-5 w-5" />
              Enviar mensagem
            </div>
          )}
        </Button>
      </motion.form>
    </div>
  );
};

export default ContactForm;
