"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // Next-Auth para autenticação
import { loginSchema, LoginFormData } from "@/lib/validationSchemas";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import DOMPurify from "dompurify";
import React, { useState } from "react";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Função para lidar com o login
  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      // Sanitização das entradas
      const sanitizedData = {
        email: DOMPurify.sanitize(data.email),
        password: data.password, // Backend deve criptografar a senha
      };

      // Autenticação com Next-Auth
      const result = await signIn("credentials", {
        email: sanitizedData.email,
        password: sanitizedData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Credenciais inválidas. Tente novamente.");
      } else {
        toast.success("Login realizado com sucesso!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Erro ao realizar login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para login com Google
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div
      className={cn(
        "flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-4"
        >
          <div className="w-full flex items-center gap-4 my-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Acesso ao Sistema
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
          </div>
        </motion.div>

        {/* Formulário */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-xl rounded-xl backdrop-blur-sm bg-white/90 dark:bg-slate-900/90">
            <CardContent className="p-0">
              <form
                className="p-6 md:p-8"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
              >
                <div className="flex flex-col gap-6">
                  {/* Campo de E-mail */}
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                      E-mail
                    </Label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        {...register("email")}
                        className="pl-10 h-12 rounded-lg border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all"
                        autoComplete="off"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Campo de Senha */}
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">
                        Senha
                      </Label>
                      <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Esqueceu sua senha?
                      </Link>
                    </div>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password")}
                        className="pl-10 h-12 rounded-lg border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all"
                        autoComplete="off"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                  </div>

                  {/* Botão de Entrar */}
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
                        Entrando...
                      </div>
                    ) : (
                      <>
                        Entrar <FiArrowRight className="ml-1" />
                      </>
                    )}
                  </Button>

                  {/* Divisor */}
                  <div className="relative flex items-center gap-4 py-2">
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      OU
                    </span>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
                  </div>

                  {/* Botão de Login com Google */}
                  <Button
                    variant="outline"
                    className="w-full h-12 flex items-center justify-center gap-2 rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                    onClick={handleGoogleLogin}
                  >
                    <FcGoogle className="w-5 h-5" />
                    Entrar com Google
                  </Button>

                  {/* Link para Registro */}
                  <div className="text-center mt-2">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Não tem uma conta?{" "}
                      <Link href="/register" className="text-blue-600 hover:underline font-medium">
                        Registre-se
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4"
        >
          © {new Date().getFullYear()} iAdv Manager - Todos os direitos reservados
        </motion.div>
      </div>
    </div>
  );
}