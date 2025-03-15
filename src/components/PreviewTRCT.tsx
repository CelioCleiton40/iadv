"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MdPrint } from "react-icons/md";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TRCTFormData, motivosRescisao } from "@/type/interfaces";
import { formatCurrency } from "@/utils/formatters";

interface PreviewTRCTProps {
    showPreview: boolean;
    setShowPreview: (show: boolean) => void;
    formData: TRCTFormData;
    totalProventos: number;
    totalDescontos: number;
    valorLiquido: number;
}

export const PreviewTRCT: React.FC<PreviewTRCTProps> = ({
    showPreview,
    setShowPreview,
    formData,
    totalProventos,
    totalDescontos,
    valorLiquido
}) => {
    return (
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Termo de Rescisão do Contrato de Trabalho</DialogTitle>
                    <Button
                        variant="outline"
                        className="absolute right-8 top-4 flex items-center gap-2"
                        onClick={() => window.print()}
                    >
                        <MdPrint size={18} />
                        Imprimir
                    </Button>
                </DialogHeader>
                <div className="space-y-6 p-4 font-serif text-slate-800 dark:text-slate-200 print:text-black">
                    <div className="text-center border-b pb-4">
                        <h1 className="text-2xl font-bold">TERMO DE RESCISÃO DO CONTRATO DE TRABALHO</h1>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-bold border-b pb-2">IDENTIFICAÇÃO DO EMPREGADOR</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="font-semibold">Nome/Razão Social:</p>
                                <p>{formData.empregadorNome}</p>
                            </div>
                            <div>
                                <p className="font-semibold">CNPJ:</p>
                                <p>{formData.empregadorCnpj}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="font-semibold">Endereço:</p>
                                <p>{formData.empregadorEndereco}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-bold border-b pb-2">IDENTIFICAÇÃO DO TRABALHADOR</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="font-semibold">Nome:</p>
                                <p>{formData.trabalhadorNome}</p>
                            </div>
                            <div>
                                <p className="font-semibold">CPF:</p>
                                <p>{formData.trabalhadorCpf}</p>
                            </div>
                            <div>
                                <p className="font-semibold">CTPS/Série:</p>
                                <p>{formData.trabalhadorCtps}</p>
                            </div>
                            <div>
                                <p className="font-semibold">PIS/PASEP:</p>
                                <p>{formData.trabalhadorPis}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-bold border-b pb-2">DADOS DO CONTRATO</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <p className="font-semibold">Data de Admissão:</p>
                                <p>{formData.dataAdmissao}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Data do Aviso Prévio:</p>
                                <p>{formData.dataAviso}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Data de Afastamento:</p>
                                <p>{formData.dataAfastamento}</p>
                            </div>
                            <div className="md:col-span-3">
                                <p className="font-semibold">Motivo da Rescisão:</p>
                                <p>{motivosRescisao[formData.motivoRescisao as keyof typeof motivosRescisao]}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-bold border-b pb-2">VERBAS RESCISÓRIAS</h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-100 dark:bg-slate-700">
                                    <th className="border p-2 text-left">Descrição</th>
                                    <th className="border p-2 text-right">Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2">Saldo de Salário ({formData.diasTrabalhados} dias)</td>
                                    <td className="border p-2 text-right">{formatCurrency(String(formData.saldoSalario))}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">13º Salário Proporcional</td>
                                    <td className="border p-2 text-right">{formatCurrency(String(formData.decimoTerceiro))}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Férias Vencidas</td>
                                    <td className="border p-2 text-right">{formatCurrency(String(formData.feriasVencidas))}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Férias Proporcionais</td>
                                    <td className="border p-2 text-right">{formatCurrency(String(formData.feriasProporcional))}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">1/3 Constitucional sobre Férias Proporcionais</td>
                                    <td className="border p-2 text-right">{formatCurrency(String(formData.umTercoFeriasProporcional))}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Aviso Prévio Indenizado</td>
                                    <td className="border p-2 text-right">{formatCurrency(String(formData.avisoPrevio))}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Multa FGTS (40% ou 20%)</td>
                                    <td className="border p-2 text-right">{formatCurrency(String(formData.multaFgts))}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Outras Verbas</td>
                                    <td className="border p-2 text-right">{formatCurrency(String(formData.outrasVerbas))}</td>
                                </tr>
                                <tr className="bg-slate-100 dark:bg-slate-700 font-bold">
                                    <td className="border p-2">Total de Proventos</td>
                                    <td className="border p-2 text-right">{formatCurrency(String(totalProventos))}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="text-lg font-bold mt-4">Descontos</h3>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-100 dark:bg-slate-700">
                                    <th className="border p-2 text-left">Descrição</th>
                                    <th className="border p-2 text-right">Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2">INSS</td>
                                    <td className="border p-2 text-right">{formatCurrency(String(formData.inss))}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">IRRF</td>
                                    <td className="border p-2 text-right">{formatCurrency(String(formData.irrf))}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Outros Descontos</td>
                                    <td className="border p-2 text-right">{formatCurrency(String(formData.outrosDescontos))}</td>
                                </tr>
                                <tr className="bg-slate-100 dark:bg-slate-700 font-bold">
                                    <td className="border p-2">Total de Descontos</td>
                                    <td className="border p-2 text-right">{formatCurrency(String(totalDescontos))}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold">Valor Líquido a Receber:</h3>
                                <span className="text-xl font-bold">{formatCurrency(String(valorLiquido))}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="text-center">
                                <p className="mb-12">_______________________________</p>
                                <p>{formData.empregadorNome}</p>
                                <p>Empregador</p>
                            </div>
                            <div className="text-center">
                                <p className="mb-12">_______________________________</p>
                                <p>{formData.trabalhadorNome}</p>
                                <p>Trabalhador</p>
                            </div>
                        </div>
                        <p className="text-center mt-8">
                            {format(new Date(), "'Local e data:' EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};