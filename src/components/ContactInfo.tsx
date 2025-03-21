import React from 'react';
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime, MdWhatsapp } from 'react-icons/md';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const ContactInfo: React.FC = () => {
  // Função para garantir que os links sejam seguros
  const safeHref = (url: string): string => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'mailto:') {
        console.warn(`Link inseguro detectado: ${url}`);
        return '#'; // Fallback para links inseguros
      }
      
      if (
        parsedUrl.hostname !== 'linkedin.com' &&
        parsedUrl.hostname !== 'instagram.com' &&
        parsedUrl.hostname !== 'facebook.com' &&
        parsedUrl.hostname !== 'wa.me'
      ) {
        console.warn(`URL de rede social inválida: ${url}`);
        return '#';
      }
      return url;
    } catch (error) {
      console.error(`URL inválida: ${url}`, error);
      return '#'; // Fallback para URLs malformadas
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Informações de Contato
      </h2>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400">
            <MdEmail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</h3>
            <a
              href={safeHref('mailto:contato@iadv.com.br')}
              className="text-blue-600 dark:text-blue-400 hover:underline transition-all"
            >
              contato@iadvmanager.com.br
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400">
            <MdPhone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Telefone</h3>
            <a
              href={safeHref('tel:+5584986180964')}
              className="text-blue-600 dark:text-blue-400 hover:underline transition-all"
            >
              +55 84 98618-0964
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400">
            <MdWhatsapp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">WhatsApp</h3>
            <a
              href={safeHref('https://wa.me/+5584986180964')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline transition-all"
            >
              +55 84 98618-0964
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400">
            <MdLocationOn className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Endereço</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Av. Augusto Severo, 1436, Centro<br />
              Mossoró - RN, 01310-100
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400">
            <MdAccessTime className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Horário de Atendimento</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Segunda a Sexta: 8h às 18h<br />
              Sábados: 8h às 12h
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Siga-nos nas redes sociais
        </h3>
        <div className="flex space-x-4">
          <a
            href={safeHref('https://linkedin.com/iadvmanager')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href={safeHref('https://instagram.com/iadvmanager')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all"
            aria-label="Instagram"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a
            href={safeHref('https://facebook.com/iadvmanager')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all"
            aria-label="Facebook"
          >
            <FaFacebook className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;