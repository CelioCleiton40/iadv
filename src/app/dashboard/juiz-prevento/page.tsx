"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MdSearch, MdFilterList } from "react-icons/md";
import { useState } from "react";
import { JudgeCard } from "@/components/judge-card"; // Importe o componente JudgeCard
import { Juiz } from "@/type/inter-juiz"; // Importe a interface Juiz do arquivo interfaces.ts que criamos

export default function JuizPreventoPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Juiz[]>([]);
  const [areaFilter, setAreaFilter] = useState("todos");

  // Mock data for judges (simulating data from a backend or API)
  const mockJudges: Juiz[] = [ // Tipando mockJudges como array de Juiz
    {
      nome: "Dr. Ricardo Santos",
      vara: "4ª Vara do Trabalho de Campinas",
      historico: "85% de decisões favoráveis em casos similares",
      especialidade: "Direito Trabalhista",
      processos: 127,
      tempoMedio: "8 meses",
      decisoesRecentes: [
        { tipo: "Procedente", data: "15/05/2023", processo: "0001234-12.2023.5.15.0001" },
        { tipo: "Parcialmente Procedente", data: "02/04/2023", processo: "0002345-23.2023.5.15.0001" },
        { tipo: "Improcedente", data: "18/03/2023", processo: "0003456-34.2023.5.15.0001" }
      ],
      estatisticas: {
        procedentes: 65,
        parciais: 20,
        improcedentes: 15
      },
      tendencias: [
        "Valoriza provas documentais sobre testemunhais",
        "Rigoroso com prazos processuais",
        "Favorável a acordos em audiências iniciais"
      ],
      jurisprudencia: [
        "Súmula 331 do TST - Terceirização",
        "OJ 394 da SDI-1 - Adicional de periculosidade",
        "Súmula 85 do TST - Compensação de jornada"
      ],
      alertas: [
        "Exige documentação completa desde a inicial",
        "Rigoroso com preclusão temporal"
      ],
      area: "trabalhista"
    },
    {
      nome: "Dra. Maria Oliveira",
      vara: "2ª Vara Cível de Campinas",
      historico: "78% de acordos homologados",
      especialidade: "Direito Civil",
      processos: 98,
      tempoMedio: "10 meses",
      decisoesRecentes: [
        { tipo: "Procedente", data: "22/05/2023", processo: "1002345-45.2023.8.26.0114" },
        { tipo: "Improcedente", data: "10/04/2023", processo: "1003456-56.2023.8.26.0114" },
        { tipo: "Procedente", data: "05/03/2023", processo: "1004567-67.2023.8.26.0114" }
      ],
      estatisticas: {
        procedentes: 55,
        parciais: 23,
        improcedentes: 22
      },
      tendencias: [
        "Prioriza tentativas de conciliação",
        "Valoriza perícias técnicas",
        "Decisões fundamentadas em jurisprudência do STJ"
      ],
      jurisprudencia: [
        "Súmula 297 do STJ - Contrato de seguro",
        "Súmula 543 do STJ - Dano moral em inscrição indevida",
        "Súmula 479 do STJ - Responsabilidade das instituições financeiras"
      ],
      alertas: [
        "Exige tentativa prévia de resolução consensual",
        "Rigoroso com especificação de provas"
      ],
      area: "civil"
    },
    {
      nome: "Dr. Paulo Mendes",
      vara: "5ª Vara Federal de São Paulo",
      historico: "62% de decisões favoráveis ao contribuinte",
      especialidade: "Direito Tributário",
      processos: 145,
      tempoMedio: "14 meses",
      decisoesRecentes: [
        { tipo: "Procedente", data: "30/05/2023", processo: "5001234-12.2023.4.03.6100" },
        { tipo: "Improcedente", data: "12/04/2023", processo: "5002345-23.2023.4.03.6100" },
        { tipo: "Parcialmente Procedente", data: "25/03/2023", processo: "5003456-34.2023.4.03.6100" }
      ],
      estatisticas: {
        procedentes: 42,
        parciais: 20,
        improcedentes: 38
      },
      tendencias: [
        "Segue rigorosamente precedentes dos tribunais superiores",
        "Valoriza pareceres técnicos",
        "Detalhista na análise de prescrição e decadência"
      ],
      jurisprudencia: [
        "Tema 69 de Repercussão Geral - STF",
        "Súmula 435 do STJ - Dissolução irregular",
        "Tema 962 do STJ - Exclusão do ICMS da base do PIS/COFINS"
      ],
      alertas: [
        "Exige prévio requerimento administrativo",
        "Rigoroso com pressupostos processuais"
      ],
      area: "tributario"
    }
  ];

  // Function to handle search based on search term and area filter
  const handleSearch = () => {
    if (areaFilter === "todos") {
      setSearchResults(mockJudges.filter(judge =>
        judge.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        judge.vara.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setSearchResults(mockJudges.filter(judge =>
        (judge.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        judge.vara.toLowerCase().includes(searchTerm.toLowerCase())) &&
        judge.area === areaFilter
      ));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 mb-2">
            Análise de Magistrados
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Consulte informações detalhadas sobre juízes, tendências de decisões e estratégias recomendadas
          </p>
        </div>

        <div className="space-y-6">
          {/* Search Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Buscar por nome do juiz ou vara"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSearch} className="sm:w-auto w-full">
                  <MdSearch className="w-4 h-4 mr-2" />
                  Pesquisar
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <MdFilterList className="text-slate-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Filtrar por área:</span>
                <Select value={areaFilter} onValueChange={setAreaFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Todas as áreas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas as áreas</SelectItem>
                    <SelectItem value="civil">Civil</SelectItem>
                    <SelectItem value="trabalhista">Trabalhista</SelectItem>
                    <SelectItem value="tributario">Tributário</SelectItem>
                    <SelectItem value="previdenciario">Previdenciário</SelectItem>
                    <SelectItem value="criminal">Criminal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {searchResults.map((judge: Juiz, index) => ( // Tipando judge no map como Juiz
              <JudgeCard key={index} judge={judge} /> // Usando o componente JudgeCard aqui e passando o judge como prop
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}