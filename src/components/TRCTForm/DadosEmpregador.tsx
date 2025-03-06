"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TRCTFormData } from "@/type/interfaces";

interface DadosEmpregadorProps {
    formData: TRCTFormData;
    handleInputChange: (field: keyof TRCTFormData, value: any) => void;
}

export const DadosEmpregador: React.FC<DadosEmpregadorProps> = ({ formData, handleInputChange }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Dados do Empregador
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Nome/Razão Social</Label>
                    <Input
                        placeholder="Nome da empresa"
                        value={formData.empregadorNome}
                        onChange={(e) => handleInputChange('empregadorNome', e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>CNPJ</Label>
                    <Input
                        placeholder="00.000.000/0000-00"
                        value={formData.empregadorCnpj}
                        onChange={(e) => handleInputChange('empregadorCnpj', e.target.value)}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label>Endereço</Label>
                <Input
                    placeholder="Endereço completo"
                    value={formData.empregadorEndereco}
                    onChange={(e) => handleInputChange('empregadorEndereco', e.target.value)}
                />
            </div>
        </div>
    );
};