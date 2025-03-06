"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { MdMenu, MdClose, MdLogin } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/recursos", label: "Recursos" },
    { href: "/sobre", label: "Sobre" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <span className="text-blue-600 dark:text-blue-400">iAdv</span>
          <span className="text-slate-800 dark:text-slate-100">Manager</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            asChild
            variant="ghost"
            className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Link href="/register" className="flex items-center gap-2">
              <MdLogin size={18} />
              Criar conta
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-600 dark:text-slate-300"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white dark:bg-slate-900/90 backdrop-blur-md z-40 md:hidden"
            >
              <div className="container mx-auto h-full flex flex-col justify-between p-4">
                {/* Mobile Navigation */}
                <nav className="mt-16 space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 text-lg font-medium transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="space-y-4">
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full flex items-center text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                  >
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    <Link
                      href="/register"
                      className="flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <MdLogin size={18} />
                      Criar conta
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}