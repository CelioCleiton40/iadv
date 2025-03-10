"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePasswordResetStore } from "@/store/passwordResetStore";
import { motion } from "framer-motion";
import { FiMail, FiArrowLeft, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

// Esquema de validação Zod
const forgotPasswordSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { email, isLoading, success, error, resetPassword } = usePasswordResetStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: email,
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await resetPassword(data.email);
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-md mx-auto", className)} {...props}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-lg">
          <CardContent className="p-0">
            <form
              className="p-6 md:p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-6">
                {/* Cabeçalho */}
                <div className="flex flex-col items-center text-center space-y-2 mb-2">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                  </motion.div>
                  <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
                    Recuperar Senha
                  </h1>
                  <p className="text-balance text-slate-600 dark:text-slate-400">
                    Enviaremos um link para redefinir sua senha
                  </p>
                </div>

                {success ? (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                    <div className="flex items-center gap-3">
                      <FiCheckCircle className="text-green-500 dark:text-green-400 h-5 w-5" />
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        Link de recuperação enviado para seu e-mail. Verifique sua caixa de entrada.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Campo de E-mail */}
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        E-mail
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                          <FiMail className="w-5 h-5" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          required
                          {...register("email")}
                          className="pl-10 h-11 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                      )}
                    </div>

                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-800">
                        <div className="flex items-center gap-3">
                          <FiAlertCircle className="text-red-500 dark:text-red-400 h-5 w-5" />
                          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                        </div>
                      </div>
                    )}

                    {/* Botão de Envio */}
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
                          Enviando...
                        </div>
                      ) : (
                        "Enviar link de recuperação"
                      )}
                    </Button>
                  </>
                )}

                {/* Voltar para login */}
                <div className="text-center mt-2">
                  <Link
                    href="/login"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center justify-center gap-1 transition-colors"
                  >
                    <FiArrowLeft className="h-4 w-4" />
                    Voltar para o login
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}