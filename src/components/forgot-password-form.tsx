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
  email: z.string().trim().toLowerCase().email("Insira um e-mail válido"),
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
    try {
      const sanitizedEmail = data.email.replace(/[^a-zA-Z0-9@._-]/g, "");
      await resetPassword(sanitizedEmail);
    } catch (err) {
      console.error("Erro ao redefinir senha:", err);
    }
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
                  <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    Recuperar Senha
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
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
                    <div className="grid gap-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        {...register("email")}
                        className="border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                      />
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

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
                      disabled={isLoading}
                    >
                      {isLoading ? "Enviando..." : "Enviar link de recuperação"}
                    </Button>
                  </>
                )}

                <div className="text-center mt-2">
                  <Link href="/login" className="text-blue-600 hover:text-blue-800">
                    <FiArrowLeft className="h-4 w-4" /> Voltar para o login
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
