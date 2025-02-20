import Link from "next/link";
import { MdInfo, MdArticle, MdQuestionAnswer, MdPhone, MdLocationOn } from "react-icons/md";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="flex items-center gap-2">
              <MdPhone className="text-slate-400" />
              <span>(11) 9999-9999</span>
            </div>
            <div className="flex items-center gap-2">
              <MdLocationOn className="text-slate-400" />
              <span>São Paulo, SP</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/sobre" 
                  className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                >
                  <MdInfo size={18} />
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                >
                  <MdArticle size={18} />
                  Blog Jurídico
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                >
                  <MdQuestionAnswer size={18} />
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-slate-400">
              Receba novidades e atualizações sobre direito
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-slate-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600 transition-colors duration-200"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
          <p>© {currentYear} Seu Escritório de Advocacia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}