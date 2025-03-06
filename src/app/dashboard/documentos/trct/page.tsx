"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdPreview } from "react-icons/md";
import { useState, useEffect } from "react";
import { TRCTFormData, initialFormState } from "@/type/interfaces";
import { calcularRescisao } from "@/utils/calculations";
import { formatCurrency } from "@/utils/formatters";
import { PreviewTRCT } from "@/components/PreviewTRCT";
import { TRCTForm } from "@/components/TRCTForm";


export default function TermoRescisaoPage() { // Renomeando para evitar conflito com o nome do componente refatorado
    const [formData, setFormData] = useState<TRCTFormData>(initialFormState);
    const [showPreview, setShowPreview] = useState(false);
    const [totalProventos, setTotalProventos] = useState(0);
    const [totalDescontos, setTotalDescontos] = useState(0);
    const [valorLiquido, setValorLiquido] = useState(0);


    const memoizedCalcularRescisao = () => {
        calcularRescisao(formData, setFormData, setTotalProventos, setTotalDescontos, setValorLiquido);
    };

    // Efeito para recalcular quando os valores relevantes mudarem
    useEffect(() => {
        if (formData.salarioBase > 0 && formData.diasTrabalhados >= 0) {
            memoizedCalcularRescisao();
        }
    }, [
        formData.salarioBase,
        formData.diasTrabalhados,
        formData.mesesTrabalhados,
        formData.motivoRescisao,
        formData.outrasVerbas,
        formData.outrosDescontos,
        formData.dataAfastamento,
        formData.feriasVencidas
    ]);

    const handleInputChange = (field: keyof TRCTFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };


    const handleSaveDraft = () => {
        localStorage.setItem("termoRescisao", JSON.stringify(formData));
        alert("Rascunho salvo com sucesso!");
    };


    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 mb-2">
                        Termo de Rescisão do Contrato de Trabalho
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        TRCT conforme as leis trabalhistas brasileiras
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <TRCTForm
                            formData={formData}
                            setFormData={setFormData}
                            totalProventos={totalProventos}
                            totalDescontos={totalDescontos}
                            valorLiquido={valorLiquido}
                            calcularRescisao={memoizedCalcularRescisao}
                            handleInputChange={handleInputChange}
                            handleSaveDraft={handleSaveDraft}
                            setShowPreview={setShowPreview}
                        />
                    </div>

                    {/* Totals and Preview Section */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 space-y-4">
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                                Resumo Financeiro
                            </h2>
                            <div>
                                <div className="flex justify-between">
                                    <p className="font-semibold">Total de Proventos:</p>
                                    <p>{formatCurrency(totalProventos)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-semibold">Total de Descontos:</p>
                                    <p className="text-red-500">-{formatCurrency(totalDescontos)}</p>
                                </div>
                                <div className="border-t my-2 border-dashed" />
                                <div className="flex justify-between font-bold text-lg">
                                    <p>Valor Líquido:</p>
                                    <p className="text-blue-600 dark:text-blue-400">{formatCurrency(valorLiquido)}</p>
                                </div>
                            </div>
                            <Button onClick={() => setShowPreview(true)} className="w-full flex items-center justify-center gap-2">
                                <MdPreview size={18} />
                                Visualizar TRCT
                            </Button>
                        </Card>
                    </div>
                </div>
            </main>
            <PreviewTRCT
                showPreview={showPreview}
                setShowPreview={setShowPreview}
                formData={formData}
                totalProventos={totalProventos}
                totalDescontos={totalDescontos}
                valorLiquido={valorLiquido}
            />
        </div>
    );
}