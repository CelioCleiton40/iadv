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
import GoogleIcon from "@/assets/google-icone.svg"; // Ícone do Google
import CompanyLogo from "@/assets/company-logo.png"; // Logo da empresa
import LawImage from "@/assets/law-image.jpg"; // Imagem relacionada à área jurídica

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
        "flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8",
        className
      )}
      {...props}
    >
      {/* Header com Logo e Imagem */}
      <div className="flex flex-col md:flex-row w-full max-w-7xl bg-white rounded-lg shadow-md overflow-hidden">
        {/* Imagem Elegante */}
        <div className="hidden md:block md:w-1/2 relative">
        <div>
      <CompanyLogo width={24} height={24} />
    </div>
        </div>

        {/* Formulário */}
        <div className="w-full md:w-1/2 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            {/* Logo da Empresa */}
          <Image src={LawImage} alt="Imagem de uma pessoa trabalhando em um escritório" width={300} height={300} />
            <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
              Cadastro
            </h1>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 md:hidden">
            Criar Conta
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Preencha os dados para se cadastrar
          </p>

          {/* Botão de Login com Google */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 mb-4"
          >
            <Image src={GoogleIcon} alt="Ícone do Google" width={24} height={24} />
            Cadastrar com Google
          </Button>

          {/* Divisor */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">Ou</span>
            </div>
          </div>

          {/* Formulário */}
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Nome
                </Label>
                <Input
                  id="firstName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Sobrenome
                </Label>
                <Input
                  id="lastName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Senha
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-700">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}