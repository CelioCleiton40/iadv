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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth";
import { toast } from "sonner";
import useAuthStore from "@/store/registerStore"; // Importa a store Zustand

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

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { setUser } = useAuthStore(); // Hook para Zustand
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const newUser = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      };

      await registerUser(newUser); // Registra o usuário

      setUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      }); // Atualiza o Zustand com os dados do usuário

      toast.success("Cadastro realizado com sucesso!");
      router.push("/perfil");
    } catch (error) {
      toast.error("Erro ao realizar cadastro. Tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Formulário */}
          <form
            className="p-6 md:p-8 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-6">
              {/* Cabeçalho */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
                  Criar Conta
                </h1>
                <p className="text-balance text-slate-600 dark:text-slate-400">
                  Preencha os dados para se cadastrar
                </p>
              </div>

              {/* Campos do formulário */}
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input
                      id="firstName"
                      type="text"
                      {...register("firstName")}
                      className="border-slate-200 dark:border-slate-800"
                    />
                    {errors.firstName && (
                      <p className="text-red-500">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input
                      id="lastName"
                      type="text"
                      {...register("lastName")}
                      className="border-slate-200 dark:border-slate-800"
                    />
                    {errors.lastName && (
                      <p className="text-red-500">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="border-slate-200 dark:border-slate-800"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="border-slate-200 dark:border-slate-800"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    className="border-slate-200 dark:border-slate-800"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                disabled={isLoading}
              >
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </Button>

              <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="text-slate-800 dark:text-slate-200 underline underline-offset-4 hover:text-slate-900 dark:hover:text-white"
                >
                  Faça login
                </Link>
              </div>
            </div>
          </form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg"
              alt="Escritório de Advocacia"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.3] dark:grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-slate-900/20" />
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-slate-500 dark:text-slate-400">
        Ao se cadastrar, você concorda com nossos{" "}
        <Link href="/terms">Termos de Serviço</Link> e{" "}
        <Link href="/politica-privacidade">Política de Privacidade</Link>.
      </div>
    </div>
  );
}
