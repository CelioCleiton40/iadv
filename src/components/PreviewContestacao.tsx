"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MdPrint } from "react-icons/md";
import { FormDataContestacao } from "@/store/contestacaoStore"; // Importe a interface FormDataContestacao

interface PreviewContestacaoProps {
    formData: FormDataContestacao;
    showPreview: boolean;
    setShowPreview: (show: boolean) => void;
}

export const PreviewContestacao: React.FC<PreviewContestacaoProps> = ({ formData, showPreview, setShowPreview }) => {
    return (
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Visualização da Contestação</DialogTitle>
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
                    <div className="text-center space-y-4">
                        <p className="uppercase font-bold">
                            EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA {formData.vara || "[VARA]"} DA COMARCA DE {formData.comarca || "[COMARCA]"}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <p className="text-center">
                            Processo nº {formData.numeroProcesso || "[NÚMERO DO PROCESSO]"}
                        </p>

                        <p className="indent-8 text-justify">
                            <span className="uppercase font-bold">{formData.reu || "[RÉU]"}</span>, já qualificado nos autos do processo em epígrafe, que lhe move <span className="uppercase font-bold">{formData.autor || "[AUTOR]"}</span>, vem, respeitosamente, à presença de Vossa Excelência, por seu advogado que esta subscreve, apresentar
                        </p>

                        <p className="text-center font-bold uppercase my-8">
                            CONTESTAÇÃO
                        </p>

                        {formData.preliminar && (
                            <div>
                                <h2 className="font-bold uppercase mb-4">I - PRELIMINARMENTE</h2>
                                <h3 className="font-semibold mb-2">{formData.preliminar}</h3>
                                <p className="indent-8 text-justify whitespace-pre-wrap">
                                    {formData.fundamentacaoPreliminar || "Não especificado"}
                                </p>
                            </div>
                        )}

                        <div>
                            <h2 className="font-bold uppercase mb-4">
                                {formData.preliminar ? "II" : "I"} - DO MÉRITO
                            </h2>
                            <p className="indent-8 text-justify whitespace-pre-wrap">
                                PARTE REQUERIDA: {formData.reu || "[DIGITE AQUI SEU NOME COMPLETO]"}, nacionalidade:{" "}
                                {formData.reuNacionalidade || "     "}, estado civil:{" "}
                                {formData.reuEstadoCivil || "     "}, profissão:{" "}
                                {formData.reuProfissao || "     "}, filiação:{" "}
                                {formData.reuFiliacao || "     "}, portador da Carteira de
                                Identidade/CNH nº: {formData.reuRGNumero || "     "}, órgão expedidor/UF:{" "}
                                {formData.reuRGOrgaoExpedidor || "     "}, data da expedição:{" "}
                                {formData.reuRGDataExpedicao || "     "}, inscrito no CPF sob o nº:{" "}
                                {formData.reuCPF || "     "}, residente e domiciliado na{" "}
                                {formData.reuResidencia || "     "}, Cidade:{" "}
                                {formData.reuCidade || "     "}, CEP:{" "}
                                {formData.reuCEP || "     "}, telefone(s):{" "}
                                {formData.reuTelefone || "     "}, WhatsApp:{" "}
                                {formData.reuWhatsApp || "     "}, e-mail:{" "}
                                {formData.reuEmail || "     "}, vem à presença de Vossa Excelência, nos
                                termos do art. 30 e seguintes da Lei n. 9.099/95, apresentar, aqui,
                            </p>


                            {formData.argumentos.map((argumento, index) => (
                                <div key={index} className="mb-6">
                                    {argumento.titulo && (
                                        <h3 className="font-semibold mb-2">{argumento.titulo}</h3>
                                    )}
                                    <p className="indent-8 text-justify whitespace-pre-wrap">
                                        {argumento.conteudo || "Não especificado"}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h2 className="font-bold uppercase mb-4">
                                {formData.preliminar ? "III" : "II"} - DAS PROVAS
                            </h2>
                            <p className="indent-8 text-justify whitespace-pre-wrap">
                                {formData.provas || "Não especificado"}
                            </p>
                        </div>

                        <div>
                            <h2 className="font-bold uppercase mb-4">
                                {formData.preliminar ? "IV" : "III"} - DOS PEDIDOS
                            </h2>
                            <p className="text-justify whitespace-pre-wrap">
                                Ante o exposto, requer:
                            </p>
                            <div className="pl-8 mt-4 whitespace-pre-wrap">
                                {formData.pedidos || "Não especificado"}
                            </div>
                        </div>

                        <div className="text-center space-y-4 mt-12">
                            <p>{formData.comarca || "[COMARCA]"}, {new Date().toLocaleDateString('pt-BR')}</p>
                            <div className="mt-16">
                                <p className="border-t border-slate-400 dark:border-slate-600 w-64 mx-auto pt-2">
                                    Advogado(a)
                                </p>
                                <p>OAB/XX 000.000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};