

import React from "react";
import Image from "next/image";
import LawImage from "../../public/assets/law-image.jpg";

const Banner = () => {
  return (
    <div className="relative w-full lg:w-5/12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
    {/* Overlay para a imagem */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-indigo-700/90 z-10"></div>

    {/* Imagem de fundo */}
    <div className="absolute inset-0">
      <Image
        src={LawImage}
        alt="Advocacia"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        className="mix-blend-overlay opacity-60"
      />
    </div>

    {/* Conteúdo sobre a imagem */}
    <div className="relative z-20 p-8 flex flex-col h-full justify-between">
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Bem-vindo ao iAdv Manager</h2>
          <p className="text-white/80">
            Gerencie seus processos jurídicos com eficiência e segurança.
          </p>
        </div>

        <div className="hidden lg:block">
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <p className="font-medium">Gestão completa de processos</p>
            </div>
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <p className="font-medium">Controle financeiro integrado</p>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <p className="font-medium">Segurança e conformidade com LGPD</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block text-sm text-white/70">
        © {new Date().getFullYear()} iAdv Manager - Todos os direitos reservados
      </div>
    </div>
  </div> 
  )
};
export default Banner;