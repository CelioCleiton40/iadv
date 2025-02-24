"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdSearch, MdGavel, MdPerson, MdHistory } from "react-icons/md";
import { useState } from "react";

export default function JuizPreventoPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const mockJudges = [
    {
      nome: "Dr. Ricardo Santos",
      vara: "4ª Vara do Trabalho de Campinas",
      historico: "85% de decisões favoráveis em casos similares",
      especialidade: "Direito Trabalhista",
      processos: 127
    },
    {
      nome: "Dra. Maria Oliveira",
      vara: "2ª Vara Cível de Campinas",
      historico: "78% de acordos homologados",
      especialidade: "Direito Civil",
      processos: 98
    }
  ];

  const handleSearch = () => {
    setSearchResults(mockJudges);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Análise de Magistrados
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Consulte informações sobre juízes e suas decisões
          </p>
        </div>

        <div className="space-y-6">
          {/* Search Section */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Buscar por nome do juiz ou número do processo"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch} className="sm:w-auto w-full">
                <MdSearch className="w-4 h-4 mr-2" />
                Pesquisar
              </Button>
            </div>
          </Card>

          {/* Results Section */}
          <div className="grid gap-4">
            {searchResults.map((judge, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <MdGavel className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                        {judge.nome}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {judge.vara}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MdHistory className="w-5 h-5 text-green-600" />
                        <span className="font-medium">Histórico</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {judge.historico}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MdGavel className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Especialidade</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {judge.especialidade}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MdPerson className="w-5 h-5 text-purple-600" />
                        <span className="font-medium">Processos</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {judge.processos} processos ativos
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}