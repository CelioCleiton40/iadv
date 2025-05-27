

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TRCTFormData, motivosRescisao } from "@/type/interfaces";

interface DadosContratoProps {
    formData: TRCTFormData;
    handleInputChange: (field: keyof TRCTFormData, value: any) => void;
    motivosRescisao: typeof motivosRescisao;
}

export const DadosContrato: React.FC<DadosContratoProps> = ({ formData, handleInputChange, motivosRescisao }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Dados do Contrato
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>Data de Admissão</Label>
                    <Input
                        type="date"
                        value={formData.dataAdmissao}
                        onChange={(e) => handleInputChange('dataAdmissao', e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Data do Aviso Prévio</Label>
                    <Input
                        type="date"
                        value={formData.dataAviso}
                        onChange={(e) => handleInputChange('dataAviso', e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Data de Afastamento</Label>
                    <Input
                        type="date"
                        value={formData.dataAfastamento}
                        onChange={(e) => handleInputChange('dataAfastamento', e.target.value)}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label>Motivo da Rescisão</Label>
                <Select onValueChange={(value) => handleInputChange('motivoRescisao', value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o motivo" defaultValue={formData.motivoRescisao} />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(motivosRescisao).map(([key, motivo]) => (
                            <SelectItem key={key} value={key}>{motivo}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};