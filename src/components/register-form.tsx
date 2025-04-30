"use client";

import { cn } from "@/lib/utils";
import { registerSchema } from "@/lib/validationSchemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth"; // <- service de autenticação
import { toast } from "sonner";
import DOMPurify from "dompurify";
import Image from "next/image";
import GoogleIcon from "../../public/assets/google-icon.svg";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import Banner from "@/components/Banner";


export function RegisterForm({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      setIsLoading(true);

      // Sanitização das entradas
      const sanitizedData = {
        firstName: DOMPurify.sanitize(data.firstName.trim()),
        lastName: DOMPurify.sanitize(data.lastName.trim()),
        email: DOMPurify.sanitize(data.email.trim().toLowerCase()),
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      // Chamada ao serviço de registro
      await registerUser(sanitizedData);

      // Feedback positivo
      toast.success("Cadastro realizado com sucesso!");

      // Redireciona para dashboard ou perfil
      router.push("/dashboard/perfil");
    } catch (error: any) {
      console.error("Erro ao registrar:", error);
      toast.error(error.message || "Erro ao realizar cadastro. Tente novamente.");
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
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500/5 rounded-full blur-3xl -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col w-full max-w-6xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row-reverse w-full">
          {/* Imagem */}
          <Banner />

          <div className="w-full lg:w-7/12 p-6 sm:p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="mb-8 flex justify-center">
                <Image src="/assets/logo.png" alt="iAdv Logo" width={150} height={150} priority />
              </div>

              <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Crie sua conta</h1>
                <p className="text-slate-600 dark:text-slate-300">Preencha os dados abaixo para começar a usar o sistema</p>
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
                  {/* Nome */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
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
                      <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                    )}
                  </div>

                  {/* Sobrenome */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
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
                      <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* E-mail */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
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
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>

                {/* Senha */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
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
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirmar Senha */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700 dark:text-slate-300">
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
                    <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Botão Submit */}
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

              {/* Login com Google */}
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 mt-6 h-12 rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
              >
                <Image src={GoogleIcon} alt="Ícone do Google" width={20} height={20} />
                <span>Cadastrar com Google</span>
              </Button>

              <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Faça login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rodapé mobile */}
      <div className="block lg:hidden text-sm text-slate-500 dark:text-slate-400 text-center mt-8">
        © {new Date().getFullYear()} iAdv Manager - Todos os direitos reservados
      </div>
    </div>
  );
}