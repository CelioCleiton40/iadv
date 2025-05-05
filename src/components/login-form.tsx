"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { cn } from "@/lib/utils";
import { loginSchema, LoginFormData } from "@/lib/validationSchemas";
import { AuthService } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
  
      const result = await AuthService.login(data);
      
      if (result?.token) {
        // Aqui você pode salvar o token, se necessário
        router.push("/dashboard");
      } else {
        setErrorMessage("Credenciais inválidas.");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Erro ao fazer login.");
    } finally {
      setIsLoading(false);
    }
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-4"
        >
          <div className="w-full flex items-center gap-4 my-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Acesso ao Sistema
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-xl rounded-xl backdrop-blur-sm bg-white/90 dark:bg-slate-900/90">
            <CardContent className="p-0">
              <form
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
                className="p-6 md:p-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="email"
                      className="text-slate-700 dark:text-slate-300"
                    >
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
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="password"
                        className="text-slate-700 dark:text-slate-300"
                      >
                        Senha
                      </Label>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-blue-600 hover:underline"
                      >
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
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {errorMessage && (
                    <p className="text-red-500 text-sm">{errorMessage}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {isLoading ? (
                      <>
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
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Entrando...
                      </>
                    ) : (
                      <>
                        Entrar <FiArrowRight className="ml-1" />
                      </>
                    )}
                  </Button>

                  <div className="relative flex items-center gap-4 py-2">
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      OU
                    </span>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => alert("Login com Google em breve.")}
                    className="w-full h-12 flex items-center justify-center gap-2 rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    <FcGoogle className="w-5 h-5" />
                    Entrar com Google
                  </Button>

                  <div className="text-center mt-2">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Não tem uma conta?{" "}
                      <Link
                        href="/register"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Registre-se
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4"
        >
          © {new Date().getFullYear()} iAdv Manager - Todos os direitos
          reservados
        </motion.div>
      </div>
    </div>
  );
}
