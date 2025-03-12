"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdSave, MdArrowBack, MdVisibility } from "react-icons/md";
import Link from "next/link";
import { toast } from "sonner";
import useFormStore from "@/store/useFormCaseStore"; // Importando a loja

export default function NovoCaso() {
  const { formData, setFormData, previewVisible, setPreviewVisible } =
    useFormStore(); // Usando a loja, incluindo previewVisible e setPreviewVisible

  const formatarMoeda = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    const valorNumerico = parseFloat(apenasNumeros) / 100;
    return valorNumerico.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.replace(/\D/g, "");
    setFormData({ valorCausa: valor ? formatarMoeda(valor) : "" });
  };

  const salvarCaso = () => {
    try {
      const casosExistentes = JSON.parse(localStorage.getItem("casos") || "[]");
      const novoCaso = {
        id: Date.now().toString(),
        dataCriacao: new Date().toISOString(),
        ...formData,
      };
      localStorage.setItem(
        "casos",
        JSON.stringify([...casosExistentes, novoCaso])
      );
      toast.success("Caso salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar caso:", error);
      toast.error("Erro ao salvar o caso. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Novo Caso
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Cadastre um novo processo
            </p>
          </div>
          <Link href="/dashboard/casos">
            <Button variant="outline" className="flex items-center gap-2">
              <MdArrowBack size={18} />
              Voltar
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <Label htmlFor="numeroProcesso">Número do Processo</Label>
              <Input
                id="numeroProcesso"
                placeholder="Digite o número do processo"
                value={formData.numeroProcesso}
                onChange={(e) =>
                  setFormData({ numeroProcesso: e.target.value })
                }
              />
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Área do Direito</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ areaDireito: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trabalhista">Trabalhista</SelectItem>
                      <SelectItem value="civil">Civil</SelectItem>
                      <SelectItem value="previdenciario">
                        Previdenciário
                      </SelectItem>
                      <SelectItem value="tributario">Tributário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Vara/Tribunal</Label>
                  <Input
                    placeholder="Digite a vara ou tribunal"
                    value={formData.vara}
                    onChange={(e) => setFormData({ vara: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fase Processual</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ faseProcessual: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a fase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inicial">Fase Inicial</SelectItem>
                      <SelectItem value="instrucao">Instrução</SelectItem>
                      <SelectItem value="recursal">Fase Recursal</SelectItem>
                      <SelectItem value="execucao">Execução</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data de Distribuição</Label>
                    <Input
                      type="date"
                      value={formData.dataDistribuicao}
                      onChange={(e) =>
                        setFormData({ dataDistribuicao: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Valor da Causa</Label>
                    <Input
                      placeholder="R$ 0,00"
                      value={formData.valorCausa}
                      onChange={handleValorChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Objeto da Ação</Label>
                  <Textarea
                    placeholder="Descreva o objeto da ação..."
                    className="min-h-[100px]"
                    value={formData.objetoAcao}
                    onChange={(e) =>
                      setFormData({ objetoAcao: e.target.value })
                    }
                  />
                </div>
                {/* Campo Parte Autora - Adicionado */}
                <div className="space-y-2">
                  <Label>Parte Autora</Label>
                  <Input
                    placeholder="Digite o nome da Parte Autora"
                    value={formData.parteAutora}
                    onChange={(e) =>
                      setFormData({ parteAutora: e.target.value })
                    }
                  />
                </div>
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Ações</h3>
              <div className="space-y-4">
                <Button
                  className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  onClick={salvarCaso}
                >
                  <MdSave size={18} />
                  Salvar Caso
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => setPreviewVisible(true)} // Usando setPreviewVisible do Zustand
                >
                  <MdVisibility size={18} />
                  Visualizar
                </Button>
              </div>
            </Card>
            {/* Modal de Visualização */}
            {previewVisible && ( // Usando previewVisible do Zustand
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <Card className="w-full max-w-3xl max-h-[80vh] overflow-y-auto">
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold">
                        Visualização do Caso
                      </h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPreviewVisible(false)} // Usando setPreviewVisible do Zustand
                      ></Button>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium text-slate-500">
                            Número do Processo
                          </h3>
                          <p>{formData.numeroProcesso || "Não informado"}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-500">
                            Área do Direito
                          </h3>
                          <p>{formData.areaDireito || "Não selecionada"}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium text-slate-500">
                            Vara/Tribunal
                          </h3>
                          <p>{formData.vara || "Não informado"}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-500">
                            Fase Processual
                          </h3>
                          <p>{formData.faseProcessual || "Não selecionada"}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium text-slate-500">
                            Data de Distribuição
                          </h3>
                          <p>{formData.dataDistribuicao || "Não informada"}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-500">
                            Valor da Causa
                          </h3>
                          <p>{formData.valorCausa || "Não informado"}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-500">
                          Objeto da Ação
                        </h3>
                        <p className="whitespace-pre-line">
                          {formData.objetoAcao || "Não informado"}
                        </p>
                      </div>
                      <hr className="my-4 border-slate-200 dark:border-slate-700" />
                      <div>
                        <h3 className="font-medium text-slate-500">
                          Parte Autora
                        </h3>
                        <p>{formData.parteAutora || "Não informado"}</p>{" "}
                        {/* Exibindo Parte Autora */}
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-500">Parte Ré</h3>
                        <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                          <p>
                            <span className="text-slate-500">Nome:</span>{" "}
                            {formData.parteRe.nome || "Não informado"}
                          </p>
                          <p>
                            <span className="text-slate-500">CPF/CNPJ:</span>{" "}
                            {formData.parteRe.cpfCnpj || "Não informado"}
                          </p>
                          <p>
                            <span className="text-slate-500">Endereço:</span>{" "}
                            {formData.parteRe.endereco || "Não informado"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-500">
                          Advogado(s) Contrário(s)
                        </h3>
                        <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                          <p>
                            <span className="text-slate-500">Nome:</span>{" "}
                            {formData.advogadoContrario.nome || "Não informado"}
                          </p>
                          <p>
                            <span className="text-slate-500">OAB:</span>{" "}
                            {formData.advogadoContrario.oab || "Não informado"}
                          </p>
                          <p>
                            <span className="text-slate-500">Contato:</span>{" "}
                            {formData.advogadoContrario.contato ||
                              "Não informado"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-500">
                          Documentos ({formData.documentos.length})
                        </h3>
                        {formData.documentos.length > 0 ? (
                          <div className="space-y-2 pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                            {formData.documentos.map((doc, index) => (
                              <p key={index}>
                                <span className="text-blue-500">•</span>{" "}
                                {doc.nome} ({doc.tipo} - {doc.tamanho})
                              </p>
                            ))}
                          </div>
                        ) : (
                          <p>Nenhum documento anexado</p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <Button
                        variant="outline"
                        onClick={() => setPreviewVisible(false)} // Usando setPreviewVisible do Zustand
                      >
                        Fechar
                      </Button>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={salvarCaso}
                      >
                        <MdSave className="mr-2" size={18} />
                        Salvar Caso
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}