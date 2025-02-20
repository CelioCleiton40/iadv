import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Criar Conta</h1>
                <p className="text-balance text-slate-600 dark:text-slate-400">
                  Preencha os dados para se cadastrar
                </p>
              </div>
              
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      className="border-slate-200 dark:border-slate-800"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      className="border-slate-200 dark:border-slate-800"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    className="border-slate-200 dark:border-slate-800"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    className="border-slate-200 dark:border-slate-800"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    className="border-slate-200 dark:border-slate-800"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600">
                Cadastrar
              </Button>

              <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-slate-800 dark:text-slate-200 underline underline-offset-4 hover:text-slate-900 dark:hover:text-white">
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
      <div className="text-balance text-center text-xs text-slate-500 dark:text-slate-400 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-slate-800 dark:hover:[&_a]:text-slate-200">
        Ao se cadastrar, você concorda com nossos <a href="#">Termos de Serviço</a>{" "}
        e <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  )
}