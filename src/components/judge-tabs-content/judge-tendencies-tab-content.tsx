"use client";
import React from 'react';
import { MdTrendingUp, MdWarning } from "react-icons/md";

interface JudgeTendenciesTabContentProps {
    tendencias: string[];
    alertas: string[];
}

export const JudgeTendenciesTabContent: React.FC<JudgeTendenciesTabContentProps> = ({ tendencias, alertas }) => {
    return (
        <div className="space-y-6">
            <div>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                    <MdTrendingUp className="text-blue-500" /> Padrões de Decisão
                </h4>
                <ul className="space-y-2">
                    {tendencias.map((tendencia, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <p className="text-slate-700 dark:text-slate-300">{tendencia}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                    <MdWarning className="text-orange-500" /> Alertas e Recomendações
                </h4>
                <ul className="space-y-2">
                    {alertas.map((alerta, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            <p className="text-slate-700 dark:text-slate-300">{alerta}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};