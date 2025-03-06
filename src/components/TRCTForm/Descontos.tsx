"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TRCTFormData } from "@/type/interfaces";

interface DescontosProps {
    formData: TRCTFormData;
    handleInputChange: (field: keyof TRCTFormData, value: any) => void;
}

export const Descontos: React.FC<DescontosProps> = ({ formData, handleInputChange }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Descontos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>INSS (Calculado Automaticamente)</Label>
                    <Input
                        type="number"
                        value={formData.inss}
                        readOnly
                        disabled
                    />
                </div>
                <div className="space-y-2">
                    <Label>IRRF (Calculado Automaticamente)</Label>
                    <Input
                        type="number"
                        value={formData.irrf}
                        readOnly
                        disabled
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label>Outros Descontos</Label>
                <Input
                    type="number"
                    placeholder="R$ 0,00"
                    value={formData.outrosDescontos}
                    onChange={(e) => handleInputChange('outrosDescontos', parseFloat(e.target.value) || 0)}
                />
            </div>
        </div>
    );
};