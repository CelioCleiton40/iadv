"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  MdSearch,
  MdGavel,
  MdPerson,
  MdHistory,
  MdTrendingUp,
  MdAccessTime,
} from "react-icons/md";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function JuizPreventoPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const mockJudges = [
    {
      nome: "Dr. Ricardo Santos",
      vara: "4ª Vara do Trabalho de Campinas",
      historico: "85% de decisões favoráveis em casos similares",
      especialidade: "Direito Trabalhista",
      processos: 127,
      tempoMedio: "8 meses",
      tendencia: "Favorável a acordos",
      tendencias: {
        acordos: 85,
        prazos: 60,
        provas: 75,
        decisoes: [
          { tipo: "Favorável ao trabalhador", percentual: 65 },
          { tipo: "Favorável ao empregador", percentual: 25 },
          { tipo: "Parcialmente procedente", percentual: 10 },
        ],
      },
    },
    {
      nome: "Dra. Maria Oliveira",
      vara: "2ª Vara Cível de Campinas",
      historico: "78% de acordos homologados",
      especialidade: "Direito Civil",
      processos: 98,
      tempoMedio: "10 meses",
      tendencia: "Rigorosa em prazos processuais",
      tendencias: {
        acordos: 70,
        prazos: 90,
        provas: 85,
        decisoes: [
          { tipo: "Favorável ao autor", percentual: 45 },
          { tipo: "Favorável ao réu", percentual: 40 },
          { tipo: "Parcialmente procedente", percentual: 15 },
        ],
      },
    },
  ];

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockJudges);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20">
      <Header />
      <main className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 mb-2">
              Análise de Magistrados
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
              Consulte informações sobre juízes e suas decisões para estratégias
              processuais mais eficazes
            </p>
          </div>

          <div className="space-y-8">
            {/* Search Section */}
            <Card className="p-4 md:p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Input
                    placeholder="Buscar por nome do juiz ou número do processo"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-11 pl-10 pr-4 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                </div>
                <Button
                  onClick={handleSearch}
                  className="h-11 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Buscando...
                    </div>
                  ) : (
                    <>
                      <MdSearch className="w-5 h-5 mr-2" />
                      Pesquisar
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Results Section */}
            {searchResults.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                  Resultados da Pesquisa
                </h2>
                <div className="grid gap-6">
                  {searchResults.map((judge, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg"
                    >
                      <div className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                            <MdGavel className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100">
                              {judge.nome}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {judge.vara}
                            </p>
                          </div>
                          <Badge className="self-start md:self-auto bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900">
                            {judge.especialidade}
                          </Badge>
                        </div>

                        <Tabs defaultValue="estatisticas" className="w-full">
                          <TabsList className="w-full mb-4">
                            <TabsTrigger
                              value="estatisticas"
                              className="flex-1"
                            >
                              Estatísticas
                            </TabsTrigger>
                            <TabsTrigger value="tendencias" className="flex-1">
                              Tendências
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="estatisticas">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              <div className="p-4 bg-slate-100 dark:bg-slate-800/70 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <MdHistory className="w-5 h-5 text-green-600 dark:text-green-500" />
                                  <span className="font-medium">Histórico</span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {judge.historico}
                                </p>
                              </div>

                              <div className="p-4 bg-slate-100 dark:bg-slate-800/70 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <MdPerson className="w-5 h-5 text-purple-600 dark:text-purple-500" />
                                  <span className="font-medium">Processos</span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {judge.processos} processos ativos
                                </p>
                              </div>

                              <div className="p-4 bg-slate-100 dark:bg-slate-800/70 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <MdAccessTime className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                                  <span className="font-medium">
                                    Tempo Médio
                                  </span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {judge.tempoMedio} para julgamento
                                </p>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="tendencias">
                            <div className="space-y-4">
                              <div className="p-4 bg-slate-100 dark:bg-slate-800/70 rounded-lg">
                                <div className="flex items-center gap-2 mb-3">
                                  <MdTrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                                  <span className="font-medium">
                                    Tendência de Decisões
                                  </span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                  {judge.tendencia}
                                </p>

                                <div className="space-y-6">
                                  {/* Métricas de tendência */}
                                  <div className="grid grid-cols-3 gap-2 text-center">
                                    <div>
                                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                                        Acordos
                                      </div>
                                      <div className="relative h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                          className="absolute top-0 left-0 h-full bg-green-500 dark:bg-green-600"
                                          style={{
                                            width: `${judge.tendencias.acordos}%`,
                                          }}
                                        ></div>
                                      </div>
                                      <div className="text-xs font-medium mt-1">
                                        {judge.tendencias.acordos}%
                                      </div>
                                    </div>

                                    <div>
                                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                                        Prazos
                                      </div>
                                      <div className="relative h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                          className="absolute top-0 left-0 h-full bg-amber-500 dark:bg-amber-600"
                                          style={{
                                            width: `${judge.tendencias.prazos}%`,
                                          }}
                                        ></div>
                                      </div>
                                      <div className="text-xs font-medium mt-1">
                                        {judge.tendencias.prazos}%
                                      </div>
                                    </div>

                                    <div>
                                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                                        Provas
                                      </div>
                                      <div className="relative h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                          className="absolute top-0 left-0 h-full bg-blue-500 dark:bg-blue-600"
                                          style={{
                                            width: `${judge.tendencias.provas}%`,
                                          }}
                                        ></div>
                                      </div>
                                      <div className="text-xs font-medium mt-1">
                                        {judge.tendencias.provas}%
                                      </div>
                                    </div>
                                  </div>

                                  {/* Distribuição de decisões */}
                                  <div>
                                    <h4 className="text-sm font-medium mb-3">
                                      Distribuição de Decisões
                                    </h4>
                                    <div className="space-y-2">
                                      {judge.tendencias.decisoes.map(
                                        (decisao: string, idx: number) => (
                                          <div key={idx} className="space-y-1">
                                            <div className="flex justify-between text-xs">
                                              <span>
                                                {typeof decisao === "object" &&
                                                decisao !== null &&
                                                "tipo" in decisao
                                                  ? (
                                                      decisao as {
                                                        tipo: string;
                                                      }
                                                    ).tipo
                                                  : ""}
                                              </span>
                                              <span className="font-medium">
                                                {typeof decisao === "object" &&
                                                decisao !== null &&
                                                "percentual" in decisao
                                                  ? (
                                                      decisao as {
                                                        percentual: number;
                                                      }
                                                    ).percentual
                                                  : 0}
                                                %
                                              </span>
                                            </div>
                                            <div className="relative h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                              <div
                                                className={`absolute top-0 left-0 h-full ${
                                                  idx === 0
                                                    ? "bg-green-500 dark:bg-green-600"
                                                    : idx === 1
                                                    ? "bg-red-500 dark:bg-red-600"
                                                    : "bg-blue-500 dark:bg-blue-600"
                                                }`}
                                                style={{
                                                  width: `${
                                                    typeof decisao ===
                                                      "object" &&
                                                    decisao !== null &&
                                                    "percentual" in decisao
                                                      ? (
                                                          decisao as {
                                                            percentual: number;
                                                          }
                                                        ).percentual
                                                      : 0
                                                  }%`,
                                                }}
                                              ></div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
