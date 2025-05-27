
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TRCTFormData } from "@/type/interfaces";

interface DadosTrabalhadorProps {
    formData: TRCTFormData;
    handleInputChange: (field: keyof TRCTFormData, value: any) => void;
}

export const DadosTrabalhador: React.FC<DadosTrabalhadorProps> = ({ formData, handleInputChange }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Dados do Trabalhador
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Nome Completo</Label>
                    <Input
                        placeholder="Nome completo do trabalhador"
                        value={formData.trabalhadorNome}
                        onChange={(e) => handleInputChange('trabalhadorNome', e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>CPF</Label>
                    <Input
                        placeholder="000.000.000-00"
                        value={formData.trabalhadorCpf}
                        onChange={(e) => handleInputChange('trabalhadorCpf', e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>CTPS/Série</Label>
                    <Input
                        placeholder="Número e Série da CTPS"
                        value={formData.trabalhadorCtps}
                        onChange={(e) => handleInputChange('trabalhadorCtps', e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>PIS/PASEP</Label>
                    <Input
                        placeholder="Número do PIS/PASEP"
                        value={formData.trabalhadorPis}
                        onChange={(e) => handleInputChange('trabalhadorPis', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};