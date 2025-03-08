"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MdGavel } from "react-icons/md";
import { Juiz } from "@/type/inter-juiz"; // Importe a interface Juiz

import { JudgeStatsTabContent } from '@/components/judge-tabs-content/judge-stats-tab-content'; // Importe os sub-componentes das Tabs
import { JudgeTendenciesTabContent } from '@/components/judge-tabs-content/judge-tendencies-tab-content';
import { JudgeJurisprudenceTabContent } from '@/components/judge-tabs-content/judge-jurisprudence-tab-content';
import { JudgeStrategiesTabContent } from '@/components/judge-tabs-content/judge-strategies-tab-content';


interface JudgeCardProps {
    judge: Juiz;
}

export const JudgeCard: React.FC<JudgeCardProps> = ({ judge }) => {
    return (
        <Card className="overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <MdGavel className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                            {judge.nome}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {judge.vara}
                        </p>
                    </div>
                    <Badge className="ml-auto" variant={
                        judge.area === "trabalhista" ? "default" :
                            judge.area === "civil" ? "secondary" :
                                judge.area === "tributario" ? "destructive" : "outline"
                    }>
                        {judge.especialidade}
                    </Badge>
                </div>
            </div>

            <Tabs defaultValue="estatisticas" className="w-full">
                <div className="px-6 pt-4">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
                        <TabsTrigger value="tendencias">Tendências</TabsTrigger>
                        <TabsTrigger value="jurisprudencia">Jurisprudência</TabsTrigger>
                        <TabsTrigger value="estrategias">Estratégias</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="estatisticas" className="p-6">
                    <JudgeStatsTabContent estatisticas={judge.estatisticas} tempoMedio={judge.tempoMedio} processos={judge.processos} decisoesRecentes={judge.decisoesRecentes} />
                </TabsContent>

                <TabsContent value="tendencias" className="p-6">
                    <JudgeTendenciesTabContent tendencias={judge.tendencias} alertas={judge.alertas} />
                </TabsContent>

                <TabsContent value="jurisprudencia" className="p-6">
                    <JudgeJurisprudenceTabContent jurisprudencia={judge.jurisprudencia} />
                </TabsContent>

                <TabsContent value="estrategias" className="p-6">
                    <JudgeStrategiesTabContent tendencias={judge.tendencias} alertas={judge.alertas} />
                </TabsContent>

            </Tabs>
        </Card>
    );
};