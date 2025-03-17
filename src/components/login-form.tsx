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
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Image from "next/image";

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

  const handleGoogleLogin = () => {
    // Aqui você pode chamar sua função de login com Google
    toast.info("Login com Google ainda não implementado.");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className={cn("flex flex-col gap-6 w-full max-w-md mx-auto", className)} {...props}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-4"
        >
          <div className="relative w-56 h-120 flex items-center justify-center mb-2">
    <Image 
      src="/assets/logo.png" 
      alt="iAdv Logo"
      width={100} 
      height={150}
      className="w-full h-full object-contain"
      priority
    />
  </div>
          <div className="w-full flex items-center gap-4 my-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Acesso ao Sistema</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
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
                className="p-6 md:p-8"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
              >
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">E-mail</Label>
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
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">Senha</Label>
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
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
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

                  <div className="relative flex items-center gap-4 py-2">
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">OU</span>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full h-12 flex items-center justify-center gap-2 rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all" 
                    onClick={handleGoogleLogin}
                  >
                    <FcGoogle className="w-5 h-5" />
                    Entrar com Google
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
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4"
        >
          © {new Date().getFullYear()} iAdv Manager- Todos os direitos reservados
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="hidden lg:block absolute top-0 right-0 w-1/3 h-full">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="hidden lg:block absolute bottom-0 left-0 w-1/3 h-full">
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
