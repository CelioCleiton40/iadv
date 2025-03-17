"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth";
import { toast } from "sonner";
import { registerStore } from "@/store/registerStore";
import DOMPurify from "dompurify";
import Image from "next/image";
import GoogleIcon from "../../public/assets/google-icon.svg";
import LawImage from "../../public/assets/law-image.jpg";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

// Esquema de validação Zod
const registerSchema = z
  .object({
    firstName: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    lastName: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Insira um e-mail válido"),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const { setUser } = registerStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      setIsLoading(true);

      // Sanitização das entradas para evitar XSS
      const sanitizedData = {
        firstName: DOMPurify.sanitize(data.firstName),
        lastName: DOMPurify.sanitize(data.lastName),
        email: DOMPurify.sanitize(data.email),
        password: data.password, // Backend deve criptografar a senha
      };

      // Chamada ao backend para registrar o usuário
      await registerUser(sanitizedData);

      // Armazena dados do usuário no store (evite armazenar senhas ou tokens sensíveis)
      setUser({
        firstName: sanitizedData.firstName,
        lastName: sanitizedData.lastName,
        email: sanitizedData.email,
      });

      // Feedback para o usuário
      toast.success("Cadastro realizado com sucesso!");
      router.push("/perfil");
    } catch (error) {
      // Evita expor informações sensíveis ao usuário final
      console.error("Erro interno ao registrar usuário:", error);
      toast.error("Erro ao realizar cadastro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-6 md:p-8",
        className
      )}
      {...props}
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500/5 rounded-full blur-3xl -z-10"></div>

      {/* Container principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col w-full max-w-6xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row-reverse w-full">
          {/* Seção de imagem e informações */}
          <div className="relative w-full lg:w-5/12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
            {/* Overlay para a imagem */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-indigo-700/90 z-10"></div>

            {/* Imagem de fundo */}
            <div className="absolute inset-0">
              <Image
                src={LawImage}
                alt="Advocacia"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="mix-blend-overlay opacity-60"
              />
            </div>

            {/* Conteúdo sobre a imagem */}
            <div className="relative z-20 p-8 flex flex-col h-full justify-between">
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4">
                    Bem-vindo ao iAdv Manager
                  </h2>
                  <p className="text-white/80">
                    Gerencie seus processos jurídicos com eficiência e
                    segurança.
                  </p>
                </div>

                <div className="hidden lg:block">
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <p className="font-medium">
                        Gestão completa de processos
                      </p>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <p className="font-medium">
                        Controle financeiro integrado
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <p className="font-medium">
                        Segurança e conformidade com LGPD
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block text-sm text-white/70">
                © {new Date().getFullYear()} iAdv Manager - Todos os direitos
                reservados
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="w-full lg:w-7/12 p-6 sm:p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="mb-8 flex justify-center">
                <Image
                  src="/assets/logo.png"
                  alt="iAdv Logo"
                  width={150}
                  height={150}
                  className="mb-6"
                  priority
                />
              </div>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  Crie sua conta
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                  Preencha os dados abaixo para começar a usar o sistema
                </p>
              </div>

              {/* Divisor */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
              </div>

              {/* Formulário */}
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Nome
                    </Label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        id="firstName"
                        {...register("firstName")}
                        className="pl-10 h-12 rounded-lg border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Sobrenome
                    </Label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        id="lastName"
                        {...register("lastName")}
                        className="pl-10 h-12 rounded-lg border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    E-mail
                  </Label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="pl-10 h-12 rounded-lg border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Senha
                  </Label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                      className="pl-10 h-12 rounded-lg border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Confirmar Senha
                  </Label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      {...register("confirmPassword")}
                      className="pl-10 h-12 rounded-lg border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Cadastrando...
                    </div>
                  ) : (
                    <>
                      Criar conta <FiArrowRight className="ml-1" />
                    </>
                  )}
                </Button>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-slate-800 px-4 text-slate-500 dark:text-slate-400">
                    Ou cadastre-se com e-mail
                  </span>
                </div>
              </form>

              {/* Botão de Login com Google (moved to bottom) */}
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 mt-6 h-12 rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
              >
                <Image
                  src={GoogleIcon}
                  alt="Ícone do Google"
                  width={20}
                  height={20}
                />
                <span>Cadastrar com Google</span>
              </Button>

              <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Faça login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Versão mobile do footer */}
      <div className="block lg:hidden text-sm text-slate-500 dark:text-slate-400 text-center mt-8">
        © {new Date().getFullYear()} iAdv Manager - Todos os direitos reservados
      </div>
    </div>
  );
}
