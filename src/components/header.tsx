"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MdMenu, MdClose, MdLogin, MdKeyboardArrowDown } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/recursos", label: "Recursos" },
    { href: "/sobre", label: "Sobre" },
    { href: "/contato", label: "Contato" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm" 
        : "bg-white dark:bg-slate-900"
    }`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <Image
            src="/assets/logo.png"
            alt="iAdv Logo"
            width={120}
            height={100}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 py-2 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Button
            asChild
            variant="ghost"
            className="relative overflow-hidden text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-all duration-300"
          >
            <Link href="/login">
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 transform -translate-x-full hover:translate-x-0 transition-transform duration-300" />
            </Link>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Link href="/register" className="flex items-center gap-2">
              <MdLogin size={18} />
              Criar conta
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
        >
          {mobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </Button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-[80px] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 lg:hidden shadow-lg"
            >
              <div className="container mx-auto p-4">
                <nav className="space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 py-2 border-b border-slate-100 dark:border-slate-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                      <MdKeyboardArrowDown className="transform -rotate-90" />
                    </Link>
                  ))}
                </nav>

                <div className="mt-6 space-y-4">
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-center text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full justify-center bg-gradient-to-r from-blue-600 to-blue-700"
                  >
                    <Link href="/register" className="flex items-center gap-2">
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