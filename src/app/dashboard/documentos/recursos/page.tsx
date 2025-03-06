"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { MdAdd, MdAttachFile, MdDelete, MdPreview, MdSave } from "react-icons/md";
import { useRef } from "react";
import { RecursoPreview } from "@/components/recurso-preview";
import { useRecursoStore } from "@/store/recursoStore";
import { toast } from 'sonner';

// Types
interface Razao {
    titulo: string;
    conteudo: string;
}

interface FormData {
    tipoRecurso: string;
    numeroProcesso: string;
    vara: string;
    tribunal: string;
    recorrente: string;
    recorrido: string;
    razoes: Razao[];
    pedidos: string;
    anexos: string[];
}

const tiposRecurso = {
    apelacao: {
        nome: "Apelação",
        requisitos: ["Tempestividade", "Preparo", "Regularidade Formal"],
    },
    agravo: {
        nome: "Agravo de Instrumento",
        requisitos: ["Cópia da decisão agravada", "Certidão de intimação", "Procuração"],
    },
    embargos: {
        nome: "Embargos de Declaração",
        requisitos: ["Omissão", "Contradição", "Obscuridade"],
    },
    especial: {
        nome: "Recurso Especial",
        requisitos: ["Prequestionamento", "Violação à Lei Federal", "Divergência Jurisprudencial"],
    }
};

export default function Recursos() {
    const printRef = useRef<HTMLDivElement>(null);

    const {
        formData,
        showPreview,
        setShowPreview,
        handleInputChange,
        handleRazaoChange,
        addRazao,
        removeRazao,
    } = useRecursoStore();

    const handleSaveDraft = () => {
        localStorage.setItem("recursoRascunho", JSON.stringify(formData));
        toast.success("Rascunho salvo com sucesso!"); // Use sonner toast
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20">
            <Header />
            <main className="container mx-auto px-4 py-6 md:py-8">
                <div className="mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 mb-2">
                        Recursos
                    </h1>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                        Elabore recursos processuais com fundamentação estruturada
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="p-4 md:p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-md">
                            <form className="space-y-6">
                                {/* Resource Type Selection */}
                                <div className="space-y-4">
                                    <Label className="text-base font-medium">Tipo de Recurso</Label>
                                    <Tabs
                                        value={formData.tipoRecurso}
                                        onValueChange={(value) => handleInputChange("tipoRecurso", value)}
                                        className="w-full"
                                    >
                                        <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
                                            {Object.entries(tiposRecurso).map(([key, { nome }]) => (
                                                <TabsTrigger key={key} value={key} className="w-full">
                                                    {nome}
                                                </TabsTrigger>
                                            ))}
                                        </TabsList>

                                        {Object.entries(tiposRecurso).map(([key, { nome, requisitos }]) => (
                                            <TabsContent key={key} value={key} className="mt-2">
                                                <Card className="p-4 bg-slate-100 dark:bg-slate-800/70 border-blue-100 dark:border-blue-900/30">
                                                    <h3 className="font-medium mb-2 text-blue-700 dark:text-blue-400">Requisitos para {nome}:</h3>
                                                    <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                                                        {requisitos.map((req) => (
                                                            <li key={req}>{req}</li>
                                                        ))}
                                                    </ul>
                                                </Card>
                                            </TabsContent>
                                        ))}
                                    </Tabs>
                                </div>

                                {/* Process Information */}
                                <div className="space-y-4">
                                    <Label className="text-base font-medium">Informações do Processo</Label>
                                    <Input
                                        placeholder="Número do Processo"
                                        value={formData.numeroProcesso}
                                        onChange={(e) => handleInputChange("numeroProcesso", e.target.value)}
                                        className="transition-all focus:ring-2 focus:ring-blue-500"
                                    />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Input
                                            placeholder="Vara/Câmara"
                                            value={formData.vara}
                                            onChange={(e) => handleInputChange("vara", e.target.value)}
                                            className="transition-all focus:ring-2 focus:ring-blue-500"
                                        />
                                        <Input
                                            placeholder="Tribunal"
                                            value={formData.tribunal}
                                            onChange={(e) => handleInputChange("tribunal", e.target.value)}
                                            className="transition-all focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Parties */}
                                <div className="space-y-4">
                                    <Label className="text-base font-medium">Partes</Label>
                                    <Input
                                        placeholder="Recorrente"
                                        value={formData.recorrente}
                                        onChange={(e) => handleInputChange("recorrente", e.target.value)}
                                        className="transition-all focus:ring-2 focus:ring-blue-500"
                                    />
                                    <Input
                                        placeholder="Recorrido"
                                        value={formData.recorrido}
                                        onChange={(e) => handleInputChange("recorrido", e.target.value)}
                                        className="transition-all focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Appeal Reasons */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Label className="text-base font-medium">Razões Recursais</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={addRazao}
                                            className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                                        >
                                            <MdAdd size={16} />
                                            Adicionar Razão
                                        </Button>
                                    </div>

                                    <AnimatePresence>
                                        {formData.razoes.map((razao, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.2 }}
                                                className="space-y-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <Label className="font-medium text-blue-700 dark:text-blue-400">Razão {index + 1}</Label>
                                                    {index > 0 && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeRazao(index)}
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                        >
                                                            <MdDelete size={16} />
                                                        </Button>
                                                    )}
                                                </div>
                                                <Input
                                                    placeholder="Título da Razão Recursal"
                                                    value={razao.titulo}
                                                    onChange={(e) => handleRazaoChange(index, "titulo", e.target.value)}
                                                    className="transition-all focus:ring-2 focus:ring-blue-500"
                                                />
                                                <Textarea
                                                    placeholder="Desenvolva sua argumentação"
                                                    className="min-h-[150px] transition-all focus:ring-2 focus:ring-blue-500"
                                                    value={razao.conteudo}
                                                    onChange={(e) => handleRazaoChange(index, "conteudo", e.target.value)}
                                                />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Requests */}
                                <div className="space-y-4">
                                    <Label className="text-base font-medium">Pedidos</Label>
                                    <Textarea
                                        placeholder="Dos Pedidos"
                                        className="min-h-[150px] transition-all focus:ring-2 focus:ring-blue-500"
                                        value={formData.pedidos}
                                        onChange={(e) => handleInputChange("pedidos", e.target.value)}
                                    />
                                </div>

                                {/* Attachments */}
                                <div className="space-y-4">
                                    <Label className="text-base font-medium">Documentos Obrigatórios</Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                                            <MdAttachFile size={18} />
                                            Decisão Recorrida
                                        </Button>
                                        <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                                            <MdAttachFile size={18} />
                                            Procuração
                                        </Button>
                                        <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                                            <MdAttachFile size={18} />
                                            Guia de Preparo
                                        </Button>
                                        <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                                            <MdAttachFile size={18} />
                                            Outros Documentos
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Card>
                    </div>

                    {/* Preview and Actions */}
                    <div className="space-y-6">
                        <Card className="p-4 md:p-6 sticky top-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-md">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
                                Ações
                            </h3>
                            <div className="space-y-4">
                                <Button
                                    className="w-full flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                                    onClick={() => setShowPreview(true)}
                                >
                                    <MdPreview size={18} />
                                    Visualizar
                                </Button>

                                <RecursoPreview
                                    formData={formData}
                                    showPreview={showPreview}
                                    setShowPreview={setShowPreview}
                                    handleSaveDraft={handleSaveDraft}
                                />

                                <Button
                                    variant="outline"
                                    className="w-full flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                                    onClick={handleSaveDraft}
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