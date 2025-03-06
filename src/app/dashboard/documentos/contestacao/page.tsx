"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { MdSave, MdPreview, MdAdd, MdDelete } from "react-icons/md";
import { PreviewContestacao } from "@/components/PreviewContestacao"; // Importe o componente PreviewContestacao
import { useContestacaoStore } from "@/store/contestacaoStore"; // Importe o store Zustand


export default function Contestacao() {
    // Utilize o store Zustand para acessar o estado e as funções
    const {
        formData,
        showPreview,
        setShowPreview,
        handleInputChange,
        handleArgumentoChange,
        addArgumento,
        removeArgumento,
    } = useContestacaoStore();


    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 mb-2">
                        Contestação
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Elabore sua contestação com argumentos estruturados
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="p-6">
                            <form className="space-y-6">
                                {/* Informações do Processo */}
                                <div className="space-y-4">
                                    <Label>Informações do Processo</Label>
                                    <Input
                                        placeholder="Número do Processo"
                                        value={formData.numeroProcesso}
                                        onChange={(e) => handleInputChange("numeroProcesso", e.target.value)}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            placeholder="Vara"
                                            value={formData.vara}
                                            onChange={(e) => handleInputChange("vara", e.target.value)}
                                        />
                                        <Input
                                            placeholder="Comarca"
                                            value={formData.comarca}
                                            onChange={(e) => handleInputChange("comarca", e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Partes */}
                                <div className="space-y-4">
                                    <Label>Partes</Label>
                                    <Input
                                        placeholder="Autor"
                                        value={formData.autor}
                                        onChange={(e) => handleInputChange("autor", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Réu"
                                        value={formData.reu}
                                        onChange={(e) => handleInputChange("reu", e.target.value)}
                                    />
                                </div>

                                 {/* Dados da Parte Requerida */}
                                 <div className="space-y-4">
                                    <Label>Dados da Parte Requerida</Label>
                                    <Input
                                        placeholder="Nome Completo da Parte Requerida"
                                        value={formData.reu} // Usando o campo 'reu' para o nome
                                        onChange={(e) => handleInputChange("reu", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Nacionalidade da Parte Requerida"
                                        value={formData.reuNacionalidade}
                                        onChange={(e) => handleInputChange("reuNacionalidade", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Estado Civil da Parte Requerida"
                                        value={formData.reuEstadoCivil}
                                        onChange={(e) => handleInputChange("reuEstadoCivil", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Profissão da Parte Requerida"
                                        value={formData.reuProfissao}
                                        onChange={(e) => handleInputChange("reuProfissao", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Filiação da Parte Requerida"
                                        value={formData.reuFiliacao}
                                        onChange={(e) => handleInputChange("reuFiliacao", e.target.value)}
                                    />
                                    <Input
                                        placeholder="RG/CNH nº da Parte Requerida"
                                        value={formData.reuRGNumero}
                                        onChange={(e) => handleInputChange("reuRGNumero", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Órgão Expedidor/UF da Parte Requerida"
                                        value={formData.reuRGOrgaoExpedidor}
                                        onChange={(e) => handleInputChange("reuRGOrgaoExpedidor", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Data de Expedição do RG da Parte Requerida"
                                        type="date"
                                        value={formData.reuRGDataExpedicao}
                                        onChange={(e) => handleInputChange("reuRGDataExpedicao", e.target.value)}
                                    />
                                    <Input
                                        placeholder="CPF da Parte Requerida"
                                        value={formData.reuCPF}
                                        onChange={(e) => handleInputChange("reuCPF", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Residência da Parte Requerida"
                                        value={formData.reuResidencia}
                                        onChange={(e) => handleInputChange("reuResidencia", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Cidade da Parte Requerida"
                                        value={formData.reuCidade}
                                        onChange={(e) => handleInputChange("reuCidade", e.target.value)}
                                    />
                                    <Input
                                        placeholder="CEP da Parte Requerida"
                                        value={formData.reuCEP}
                                        onChange={(e) => handleInputChange("reuCEP", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Telefone(s) da Parte Requerida"
                                        value={formData.reuTelefone}
                                        onChange={(e) => handleInputChange("reuTelefone", e.target.value)}
                                    />
                                    <Input
                                        placeholder="WhatsApp da Parte Requerida"
                                        value={formData.reuWhatsApp}
                                        onChange={(e) => handleInputChange("reuWhatsApp", e.target.value)}
                                    />
                                    <Input
                                        placeholder="Email da Parte Requerida"
                                        type="email"
                                        value={formData.reuEmail}
                                        onChange={(e) => handleInputChange("reuEmail", e.target.value)}
                                    />
                                </div>

                                {/* Preliminares */}
                                <div className="space-y-4">
                                    <Label>Preliminares</Label>
                                    <Select
                                        value={formData.preliminar}
                                        onValueChange={(value) => handleInputChange("preliminar", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione as preliminares" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[
                                                "Incompetência do Juízo",
                                                "Ilegitimidade de Parte",
                                                "Litispendência",
                                                "Coisa Julgada",
                                                "Prescrição",
                                                "Decadência",
                                                "Inépcia da Inicial"
                                            ].map((preliminar) => (
                                                <SelectItem key={preliminar} value={preliminar}>
                                                    {preliminar}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Textarea
                                        placeholder="Fundamente as preliminares selecionadas"
                                        className="min-h-[100px]"
                                        value={formData.fundamentacaoPreliminar}
                                        onChange={(e) => handleInputChange("fundamentacaoPreliminar", e.target.value)}
                                    />
                                </div>

                                {/* Argumentos de Mérito */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Label>Argumentos de Mérito</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={addArgumento}

                                            className="flex items-center gap-2"
                                        >
                                            <MdAdd size={16} />
                                            Adicionar Argumento
                                        </Button>
                                    </div>

                                    {formData.argumentos.map((argumento, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-4 p-4 border rounded-lg"
                                        >
                                            <div className="flex justify-between items-center">
                                                <Label>Argumento {index + 1}</Label>
                                                {index > 0 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeArgumento(index)}
                                                        className="text-red-500"
                                                    >
                                                        <MdDelete size={16} />
                                                    </Button>
                                                )}
                                            </div>
                                            <Input
                                                placeholder="Título do Argumento"
                                                value={argumento.titulo}
                                                onChange={(e) => handleArgumentoChange(index, "titulo", e.target.value)}
                                            />
                                            <Textarea
                                                placeholder="Desenvolva seu argumento"
                                                className="min-h-[150px]"
                                                value={argumento.conteudo}
                                                onChange={(e) => handleArgumentoChange(index, "conteudo", e.target.value)}
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Provas */}
                                <div className="space-y-4">
                                    <Label>Provas</Label>
                                    <Textarea
                                        placeholder="Das Provas"
                                        className="min-h-[150px]"
                                        value={formData.provas}
                                        onChange={(e) => handleInputChange("provas", e.target.value)}
                                    />
                                </div>

                                {/* Pedidos */}
                                <div className="space-y-4">
                                    <Label>Pedidos</Label>
                                    <Textarea
                                        placeholder="Dos Pedidos"
                                        className="min-h-[150px]"
                                        value={formData.pedidos}
                                        onChange={(e) => handleInputChange("pedidos", e.target.value)}
                                    />
                                </div>
                            </form>
                        </Card>
                    </div>

                    {/* Preview and Actions */}
                    <div className="space-y-6">
                        <Card className="p-6 sticky top-6">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
                                Ações
                            </h3>
                            <div className="space-y-4">
                                <Button
                                    className="w-full flex items-center gap-2"
                                    onClick={() => setShowPreview(true)}
                                >
                                    <MdPreview size={18} />
                                    Visualizar
                                </Button>

                                <PreviewContestacao formData={formData} showPreview={showPreview} setShowPreview={setShowPreview} />

                                <Button
                                    variant="outline"
                                    className="w-full flex items-center gap-2"
                                >
                                    <MdSave size={18} />
                                    Salvar Rascunho
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}