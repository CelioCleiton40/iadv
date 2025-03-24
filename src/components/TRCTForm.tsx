"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdSave, MdPreview, MdCalculate } from "react-icons/md";
import DOMPurify from "dompurify"; // Biblioteca para sanitização contra XSS
import { TRCTFormData, motivosRescisao } from "@/type/interfaces";
import { formatCurrency } from "@/utils/formatters";

// Componentes do formulário
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
  totalProventos,
  totalDescontos,
  valorLiquido,
  calcularRescisao: propCalcularRescisao, // Renomeando para evitar conflito dentro do componente
  handleInputChange,
  handleSaveDraft,
  setShowPreview,
}) => {
  // Função para sanitizar entradas
  const sanitizeInput = (value: string): string => {
    return DOMPurify.sanitize(value);
  };

  // Função segura para lidar com mudanças de input
  const safeHandleInputChange = (field: keyof TRCTFormData, value: any) => {
    if (typeof value === "string") {
      value = sanitizeInput(value); // Sanitiza entradas de texto
    }
    handleInputChange(field, value);
  };

  return (
    <Card className="p-6">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Dados do Empregador */}
        <DadosEmpregador
          formData={formData}
          handleInputChange={safeHandleInputChange}
        />

        {/* Dados do Trabalhador */}
        <DadosTrabalhador
          formData={formData}
          handleInputChange={safeHandleInputChange}
        />

        {/* Dados do Contrato */}
        <DadosContrato
          formData={formData}
          handleInputChange={safeHandleInputChange}
          motivosRescisao={motivosRescisao}
        />

        {/* Dados Financeiros */}
        <DadosFinanceiros
          formData={formData}
          handleInputChange={safeHandleInputChange}
        />

        {/* Descontos */}
        <Descontos
          formData={formData}
          handleInputChange={safeHandleInputChange}
        />

        {/* Resumo dos Valores */}
        <div className="mt-6 space-y-2">
          <p>
            <strong>Total de Proventos:</strong>{" "}
            {formatCurrency(totalProventos)}
          </p>
          <p>
            <strong>Total de Descontos:</strong>{" "}
            {formatCurrency(totalDescontos)}
          </p>
          <p>
            <strong>Valor Líquido:</strong> {formatCurrency(valorLiquido)}
          </p>
        </div>

        {/* Botões de Ação */}
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
            onClick={propCalcularRescisao} // Usa a função renomeada
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