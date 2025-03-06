"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TRCTFormData } from "@/type/interfaces";

interface DadosFinanceirosProps {
    formData: TRCTFormData;
    handleInputChange: (field: keyof TRCTFormData, value: any) => void;
}

export const DadosFinanceiros: React.FC<DadosFinanceirosProps> = ({ formData, handleInputChange }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Dados Financeiros
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>Salário Base</Label>
                    <Input
                        type="number"
                        placeholder="R$ 0,00"
                        value={formData.salarioBase}
                        onChange={(e) => handleInputChange('salarioBase', parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Meses Trabalhados no Ano</Label>
                    <Input
                        type="number"
                        placeholder="Meses"
                        value={formData.mesesTrabalhados}
                        onChange={(e) => handleInputChange('mesesTrabalhados', parseInt(e.target.value) || 0)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Dias Trabalhados no Mês</Label>
                    <Input
                        type="number"
                        placeholder="Dias"
                        value={formData.diasTrabalhados}
                        onChange={(e) => handleInputChange('diasTrabalhados', parseInt(e.target.value) || 0)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>Férias Vencidas (Valor)</Label>
                    <Input
                        type="number"
                        placeholder="R$ 0,00"
                        value={formData.feriasVencidas}
                        onChange={(e) => handleInputChange('feriasVencidas', parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Outras Verbas (Proventos)</Label>
                    <Input
                        type="number"
                        placeholder="R$ 0,00"
                        value={formData.outrasVerbas}
                        onChange={(e) => handleInputChange('outrasVerbas', parseFloat(e.target.value) || 0)}
                    />
                </div>
            </div>
        </div>
    );
};