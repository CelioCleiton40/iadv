"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdSave, MdPreview, MdCalculate } from "react-icons/md";
import { useState, useEffect } from "react";
import { TRCTFormData, initialFormState, motivosRescisao } from "@/type/interfaces"; // Vamos criar este arquivo de tipos
import { calcularRescisao } from "@/utils/calculations";
import { formatCurrency } from "@/utils/formatters";

import { DadosEmpregador } from "@/components/TRCTForm/DadosEmpregador";
import { DadosTrabalhador } from "@/components/TRCTForm/DadosTrabalhador";
import { DadosContrato } from "@/components/TRCTForm/DadosContrato";
import { DadosFinanceiros } from "@/components/TRCTForm/DadosFinanceiros";
import { Descontos } from "@/components/TRCTForm/Descontos";


interface TRCTFormProps {
    formData: TRCTFormData;
    setFormData: (formData: TRCTFormData) => void;
    totalProventos: number;
    totalDescontos: number;
    valorLiquido: number;
    calcularRescisao: () => void;
    handleInputChange: (field: keyof TRCTFormData, value: any) => void;
    handleSaveDraft: () => void;
    setShowPreview: (show: boolean) => void;
}

export const TRCTForm: React.FC<TRCTFormProps> = ({
    formData,
    setFormData,
    totalProventos,
    totalDescontos,
    valorLiquido,
    calcularRescisao: propCalcularRescisao, // Renomeando para evitar conflito dentro do componente
    handleInputChange,
    handleSaveDraft,
    setShowPreview,
}) => {

    return (
        <Card className="p-6">
            <form className="space-y-6">
                {/* Dados do Empregador */}
                <DadosEmpregador formData={formData} handleInputChange={handleInputChange} />

                {/* Dados do Trabalhador */}
                <DadosTrabalhador formData={formData} handleInputChange={handleInputChange} />

                {/* Dados do Contrato */}
                <DadosContrato formData={formData} handleInputChange={handleInputChange} motivosRescisao={motivosRescisao} />

                {/* Dados Financeiros */}
                <DadosFinanceiros formData={formData} handleInputChange={handleInputChange} />

                {/* Descontos */}
                <Descontos formData={formData} handleInputChange={handleInputChange} />


                {/* Actions Buttons */}
                <div className="flex justify-end gap-4 mt-8">
                    <Button
                        variant="secondary"
                        onClick={handleSaveDraft}
                        className="flex items-center gap-2"
                    >
                        <MdSave size={18} />
                        Salvar Rascunho
                    </Button>
                    <Button
                        variant="outline"
                        onClick={propCalcularRescisao} // Usando a prop renomeada
                        className="flex items-center gap-2"
                    >
                        <MdCalculate size={18} />
                        Calcular
                    </Button>
                    <Button
                        onClick={() => setShowPreview(true)}
                        className="flex items-center gap-2"
                    >
                        <MdPreview size={18} />
                        Visualizar
                    </Button>
                </div>
            </form>
        </Card>
    );
};