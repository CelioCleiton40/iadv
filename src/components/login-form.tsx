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
import { loginSchema, LoginFormData } from "@/lib/validationSchemas";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useState } from "react";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const [attempts, setAttempts] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    if (attempts >= 5) {
      toast.error("Muitas tentativas falhas. Aguarde alguns minutos.");
      return;
    }

    try {
      await login(data);
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (err) {
      setAttempts((prev) => prev + 1);
      toast.error("Credenciais inválidas. Tente novamente.");
      console.error(err);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-md mx-auto", className)} {...props}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-lg">
          <CardContent className="p-0">
            <form
              className="p-6 md:p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...register("email")}
                      className="pl-10 h-11 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all"
                      autoComplete="off"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
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
                      className="pl-10 h-11 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all"
                      autoComplete="off"
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-md flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Entrando...
                    </div>
                  ) : (
                    <>
                      Entrar <FiArrowRight className="ml-1" />
                    </>
                  )}
                </Button>

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
    </div>
  );
}
