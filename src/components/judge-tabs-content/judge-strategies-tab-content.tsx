"use client";
import React from 'react';
import { MdPerson } from "react-icons/md";

interface JudgeStrategiesTabContentProps {
    tendencias: string[];
    alertas: string[];
}

export const JudgeStrategiesTabContent: React.FC<JudgeStrategiesTabContentProps> = ({ tendencias, alertas }) => {
    return (
        <div className="space-y-6">
            <div>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                    <MdPerson className="text-violet-500" /> Estratégias Processuais Sugeridas
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Com base na análise do perfil do magistrado, algumas estratégias podem ser mais eficazes.
                    Estas sugestões são baseadas em tendências de decisão e alertas identificados.
                </p>
                <ul className="list-decimal space-y-2 pl-5">
                    {tendencias.map((tendencia, idx) => (
                        <li key={idx} className="text-slate-700 dark:text-slate-300">{tendencia}</li>
                    ))}
                    {alertas.map((alerta, idx) => (
                        <li key={idx} className="text-slate-700 dark:text-slate-300">{alerta}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};