// app/register/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/register-form";

export default async function RegisterPage() {
  // Verifica sessão no servidor
  const session = await getServerSession(authOptions);

  // Se o usuário já estiver autenticado, redirecione
  if (session) {
    redirect("/dashboard");
  }

  return <RegisterForm />;
}