"use client";

import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { Header } from "@/components/header";

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              iAdv Manager
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Sistema de Gestão
            </p>
          </div>

          <ForgotPasswordForm />

          <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} iAdv Manager. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </>
  );
}