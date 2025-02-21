"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { MdLogin } from "react-icons/md";

export function Header() {
  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
          <span className="text-blue-700 dark:text-blue-500">iAdv</span>
          Manager
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/recursos" 
            className="text-slate-600 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-500 transition-colors"
          >
            Recursos
          </Link>
          <Link 
            href="/precos" 
            className="text-slate-600 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-500 transition-colors"
          >
            Preços
          </Link>
          <Link 
            href="/sobre" 
            className="text-slate-600 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-500 transition-colors"
          >
            Sobre
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="ghost"
            className="text-slate-600 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-500"
          >
            <Link href="/login">Entrar</Link>
          </Button>
          <Button
            asChild
            className="bg-blue-700 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            <Link href="/cadastro" className="flex items-center gap-2">
              <MdLogin size={18} />
              Começar
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}