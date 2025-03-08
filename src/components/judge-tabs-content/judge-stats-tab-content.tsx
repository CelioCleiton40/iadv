"use client";
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MdTrendingUp, MdAccessTime, MdHistory } from "react-icons/md";
import { Estatisticas, DecisaoRecente } from "@/type/inter-juiz"; // Importe as interfaces

interface JudgeStatsTabContentProps {
    estatisticas: Estatisticas;
    tempoMedio: string;
    processos: number;
    decisoesRecentes: DecisaoRecente[];
}

export const JudgeStatsTabContent: React.FC<JudgeStatsTabContentProps> = ({ estatisticas, tempoMedio, processos, decisoesRecentes }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
                <h4 className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <MdTrendingUp className="text-green-500" /> Resultados de Decisões
                </h4>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Procedentes</span>
                        <span className="font-medium">{estatisticas.procedentes}%</span>
                    </div>
                    <Progress value={estatisticas.procedentes} className="h-2 bg-slate-200 dark:bg-slate-700" />

                    <div className="flex justify-between text-sm">
                        <span>Parcialmente Procedentes</span>
                        <span className="font-medium">{estatisticas.parciais}%</span>
                    </div>
                    <Progress value={estatisticas.parciais} className="h-2 bg-slate-200 dark:bg-slate-700" />

                    <div className="flex justify-between text-sm">
                        <span>Improcedentes</span>
                        <span className="font-medium">{estatisticas.improcedentes}%</span>
                    </div>
                    <Progress value={estatisticas.improcedentes} className="h-2 bg-slate-200 dark:bg-slate-700" />
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <MdAccessTime className="text-blue-500" /> Tempo e Volume
                </h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Tempo médio de julgamento:</span>
                        <Badge variant="outline">{tempoMedio}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Processos ativos:</span>
                        <Badge variant="outline">{processos}</Badge>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <MdHistory className="text-purple-500" /> Decisões Recentes
                </h4>
                <div className="space-y-3">
                    {decisoesRecentes.map((decisao, idx) => (
                        <div key={idx} className="text-sm border-l-2 pl-3 py-1" style={{
                            borderColor: decisao.tipo === "Procedente" ? "#22c55e" :
                                         decisao.tipo === "Improcedente" ? "#ef4444" : "#f59e0b"
                        }}>
                            <div className="font-medium">{decisao.tipo}</div>
                            <div className="text-slate-500 dark:text-slate-400 text-xs">
                                {decisao.data} • Processo: {decisao.processo}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};