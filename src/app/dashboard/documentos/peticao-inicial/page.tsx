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
import { MdSave, MdPreview, MdAdd, MdDelete, MdPrint } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePeticaoStore } from "@/store/peticaoStore";

export default function PeticaoInicial() {
  const {
    formData,
    showPreview,
    peticaoTemplates,
    setFormData,
    setShowPreview,
    handleInputChange,
    handleParteChange,
    addParte,
    removeParte,
    handleTemplateChange,
    handleSaveDraft,
  } = usePeticaoStore();

  const PreviewPeticao = () => (
    <Dialog open={showPreview} onOpenChange={(show) => setShowPreview(show)}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Visualização da Petição</DialogTitle>
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
            <p className="uppercase">
              EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA{" "}
              {formData.vara} DA COMARCA DE {formData.comarca}
            </p>
          </div>

          <div className="space-y-6">
            {formData.partes.map((parte, index) => (
              <p key={index} className="indent-8">
                {parte.nome}, {parte.qualificacao}
                {index === 0
                  ? ", vem respeitosamente à presença de Vossa Excelência propor a presente"
                  : ""}
              </p>
            ))}

            <p className="text-center font-bold uppercase">
              {formData.modelo || "AÇÃO"}
            </p>

            <div>
              <h2 className="font-bold uppercase mb-4">I - DOS FATOS</h2>
              <p className="indent-8 whitespace-pre-wrap">
                {/* Exibindo os dados da PARTE REQUERENTE na visualização */}
                PARTE REQUERENTE: {formData.requerenteNome}, nacionalidade:{" "}
                {formData.requerenteNacionalidade}, estado civil:{" "}
                {formData.requerenteEstadoCivil}, profissão:{" "}
                {formData.requerenteProfissao}, filiação:{" "}
                {formData.requerenteFiliacao}, portador(a) da Carteira de
                Identidade nº: {formData.requerenteRGNumero}, órgão
                expedidor/UF: {formData.requerenteRGOrgaoExpedidor}, data da
                expedição: {formData.requerenteRGDataExpedicao}, inscrito(a) no
                CPF sob o nº: {formData.requerenteCPF}, residente e
                domiciliado(a) na {formData.requerenteResidencia}, Cidade:{" "}
                {formData.requerenteCidade}, CEP: {formData.requerenteCEP},
                telefone(s): {formData.requerenteTelefone}, WhatsApp:{" "}
                {formData.requerenteWhatsApp}, e-mail:{" "}
                {formData.requerenteEmail}, vem, à presença de Vossa Excelência,
                propor a presente {"\n\n"}
                {formData.dosFatos || "Não especificado"}
              </p>
            </div>

            <div>
              <h2 className="font-bold uppercase mb-4">II - DO DIREITO</h2>
              <p className="indent-8 whitespace-pre-wrap">
                {formData.doDireito || "Não especificado"}
              </p>
            </div>

            <div>
              <h2 className="font-bold uppercase mb-4">III - DOS PEDIDOS</h2>
              <p className="whitespace-pre-wrap">
                {formData.dosPedidos || "Não especificado"}
              </p>
            </div>

            <p>Dá-se à causa o valor de {formData.valorCausa || "R$ 0,00"}</p>

            <div className="text-center space-y-4 mt-8">
              <p>
                {formData.comarca}, {new Date().toLocaleDateString()}
              </p>
              <p className="mt-12">_____________________________</p>
              <p>Advogado(a)</p>
              <p>OAB/XX 000.000</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 mb-2">
            {formData.modelo || "Petição Inicial"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Crie uma nova petição inicial usando nossos modelos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <form className="space-y-6">
                {/* Template Selection */}
                <div className="space-y-2">
                  <Label>Modelo de Petição</Label>
                  <Select
                    onValueChange={(value) =>
                      handleTemplateChange(
                        value as keyof typeof peticaoTemplates
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um modelo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cobranca">Ação de Cobrança</SelectItem>
                      <SelectItem value="indenizacao">
                        Ação de Indenização
                      </SelectItem>
                      <SelectItem value="obrigacao">
                        Obrigação de Fazer
                      </SelectItem>
                      <SelectItem value="despejo">Ação de Despejo</SelectItem>
                      <SelectItem value="juizadoEspecialCivel">
                        Juizado Especial Cível
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Informações do Juízo */}
                <div className="space-y-4">
                  <Label>Informações do Juízo</Label>
                  <Input
                    placeholder="Comarca"
                    value={formData.comarca}
                    onChange={(e) =>
                      handleInputChange("comarca", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Vara"
                    value={formData.vara}
                    onChange={(e) => handleInputChange("vara", e.target.value)}
                  />
                </div>

                {/* **Nova Seção: Dados da PARTE REQUERENTE** */}
                <div className="space-y-4">
                  <Label>Dados da parte requerente</Label>
                  <Input
                    placeholder="Nome Completo"
                    value={formData.requerenteNome}
                    onChange={(e) =>
                      handleInputChange("requerenteNome", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Nacionalidade"
                    value={formData.requerenteNacionalidade}
                    onChange={(e) =>
                      handleInputChange(
                        "requerenteNacionalidade",
                        e.target.value
                      )
                    }
                  />
                  <Input
                    placeholder="Estado Civil"
                    value={formData.requerenteEstadoCivil}
                    onChange={(e) =>
                      handleInputChange("requerenteEstadoCivil", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Profissão"
                    value={formData.requerenteProfissao}
                    onChange={(e) =>
                      handleInputChange("requerenteProfissao", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Filiação"
                    value={formData.requerenteFiliacao}
                    onChange={(e) =>
                      handleInputChange("requerenteFiliacao", e.target.value)
                    }
                  />
                  <Input
                    placeholder="RG Número"
                    value={formData.requerenteRGNumero}
                    onChange={(e) =>
                      handleInputChange("requerenteRGNumero", e.target.value)
                    }
                  />
                  <Input
                    placeholder="RG Órgão Expedidor/UF"
                    value={formData.requerenteRGOrgaoExpedidor}
                    onChange={(e) =>
                      handleInputChange(
                        "requerenteRGOrgaoExpedidor",
                        e.target.value
                      )
                    }
                  />
                  <Input
                    placeholder="RG Data de Expedição"
                    type="date" // Usando tipo date para facilitar a seleção de data
                    value={formData.requerenteRGDataExpedicao}
                    onChange={(e) =>
                      handleInputChange(
                        "requerenteRGDataExpedicao",
                        e.target.value
                      )
                    }
                  />
                  <Input
                    placeholder="CPF"
                    value={formData.requerenteCPF}
                    onChange={(e) =>
                      handleInputChange("requerenteCPF", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Residência (Endereço Completo)"
                    value={formData.requerenteResidencia}
                    onChange={(e) =>
                      handleInputChange("requerenteResidencia", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Cidade"
                    value={formData.requerenteCidade}
                    onChange={(e) =>
                      handleInputChange("requerenteCidade", e.target.value)
                    }
                  />
                  <Input
                    placeholder="CEP"
                    value={formData.requerenteCEP}
                    onChange={(e) =>
                      handleInputChange("requerenteCEP", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Telefone(s)"
                    value={formData.requerenteTelefone}
                    onChange={(e) =>
                      handleInputChange("requerenteTelefone", e.target.value)
                    }
                  />
                  <Input
                    placeholder="WhatsApp"
                    value={formData.requerenteWhatsApp}
                    onChange={(e) =>
                      handleInputChange("requerenteWhatsApp", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Email"
                    type="email" // Usando tipo email para validação básica de email
                    value={formData.requerenteEmail}
                    onChange={(e) =>
                      handleInputChange("requerenteEmail", e.target.value)
                    }
                  />
                </div>

                {/* Partes do Processo (Réu/Réus) */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Partes do Processo (Réu/Réus)</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addParte}
                      className="flex items-center gap-2"
                    >
                      <MdAdd size={16} />
                      Adicionar Parte
                    </Button>
                  </div>

                  {formData.partes.map((parte, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 p-4 border rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <Label>Parte {index + 1}</Label>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeParte(index)}
                            className="text-red-500"
                          >
                            <MdDelete size={16} />
                          </Button>
                        )}
                      </div>
                      <Input
                        placeholder="Nome completo"
                        value={parte.nome}
                        onChange={(e) =>
                          handleParteChange(index, "nome", e.target.value)
                        }
                      />
                      <Textarea
                        placeholder="Qualificação"
                        value={parte.qualificacao}
                        onChange={(e) =>
                          handleParteChange(
                            index,
                            "qualificacao",
                            e.target.value
                          )
                        }
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Fatos e Direito */}
                <div className="space-y-4">
                  <Label>Fatos e Direito</Label>
                  <Textarea
                    placeholder="Dos Fatos"
                    className="min-h-[150px]"
                    value={formData.dosFatos}
                    onChange={(e) =>
                      handleInputChange("dosFatos", e.target.value)
                    }
                  />
                  <Textarea
                    placeholder="Do Direito"
                    className="min-h-[150px]"
                    value={formData.doDireito}
                    onChange={(e) =>
                      handleInputChange("doDireito", e.target.value)
                    }
                  />
                </div>

                {/* Pedidos */}
                <div className="space-y-4">
                  <Label>Pedidos</Label>
                  <Textarea
                    placeholder="Dos Pedidos"
                    className="min-h-[150px]"
                    value={formData.dosPedidos}
                    onChange={(e) =>
                      handleInputChange("dosPedidos", e.target.value)
                    }
                  />
                </div>

                {/* Valor da Causa */}
                <div className="space-y-2">
                  <Label>Valor da Causa</Label>
                  <Input
                    type="text"
                    placeholder="R$ 0,00"
                    value={formData.valorCausa}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value) {
                        const numberValue = parseInt(value, 10) / 100;
                        const formattedValue = numberValue.toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        );
                        handleInputChange("valorCausa", formattedValue);
                      } else {
                        handleInputChange("valorCausa", "");
                      }
                    }}
                  />
                </div>
              </form>
            </Card>
          </div>

          {/* Preview and Actions */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
                Ações
              </h3>
              <div className="space-y-4">
                {/* Update the Preview button */}
                <Button
                  className="w-full flex items-center gap-2"
                  onClick={() => setShowPreview(true)}
                >
                  <MdPreview size={18} />
                  Visualizar
                </Button>

                <PreviewPeticao />

                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
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
