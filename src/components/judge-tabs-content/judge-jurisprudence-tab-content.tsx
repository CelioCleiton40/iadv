
import React from 'react';
import { MdLibraryBooks } from "react-icons/md";

interface JudgeJurisprudenceTabContentProps {
    jurisprudencia: string[];
}

export const JudgeJurisprudenceTabContent: React.FC<JudgeJurisprudenceTabContentProps> = ({ jurisprudencia }) => {
    return (
        <div className="space-y-6">
            <div>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                    <MdLibraryBooks className="text-teal-500" /> Jurisprudência Relevante
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Jurisprudência são as decisões reiteradas dos tribunais sobre um determinado tema, servindo como precedente para casos futuros.
                    Conhecer a jurisprudência dominante de um magistrado pode ser crucial para a estratégia processual.
                </p>
                <ul className="space-y-2">
                    {jurisprudencia.map((juris, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                            <span className="text-teal-500 mt-1">•</span>
                            <p className="text-slate-700 dark:text-slate-300">{juris}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};