import Link from "next/link";
import { MdInfo, MdArticle, MdQuestionAnswer, MdPhone, MdLocationOn } from "react-icons/md";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">iAdv Manager</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Sua solução completa para gestão de escritório de advocacia.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/recursos">Recursos</Link></li>
              <li><Link href="/precos">Preços</Link></li>
              <li><Link href="/seguranca">Segurança</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/documentacao">Documentação</Link></li>
              <li><Link href="/tutorial">Tutorial</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/suporte">Suporte</Link></li>
              <li><Link href="/contato">Contato comercial</Link></li>
              <li><Link href="/sobre">Sobre nós</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} iAdv Manager. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}