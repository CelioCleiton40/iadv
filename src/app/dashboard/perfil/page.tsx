"use client";

import { Header } from "@/components/header";
import { PerfilHeader } from "@/components/perfil/PerfilHeader";
import { PerfilSidebar } from "@/components/perfil/PerfilSidebar";
import { PerfilContent } from "@/components/perfil/PerfilContent";
import { usePerfilStore } from "@/store/perfilStore";
import { useEffect } from "react";

export default function Perfil() {
  // Busca os dados ao carregar
  useEffect(() => {
    const loadPerfil = async () => {
      try {
        await usePerfilStore.getState().fetchPerfil();
      } catch (error) {
        console.error("Erro ao carregar perfil");
      }
    };

    loadPerfil();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <PerfilHeader />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar com informações do perfil */}
          <PerfilSidebar />
          
          {/* Conteúdo principal com as abas */}
          <PerfilContent />
        </div>
      </main>
    </div>
  );
}