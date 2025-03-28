

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MdPictureAsPdf, MdSave } from "react-icons/md";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { useStore } from "@/store/store"; // Importando Zustand
import { RecursoPreview } from "@/type/inter-face-recurso";


const tiposRecurso = {
  apelacao: {
    nome: "Apelação",
    requisitos: ["Tempestividade", "Preparo", "Regularidade Formal"],
  },
  agravo: {
    nome: "Agravo de Instrumento",
    requisitos: [
      "Cópia da decisão agravada",
      "Certidão de intimação",
      "Procuração",
    ],
  },
  embargos: {
    nome: "Embargos de Declaração",
    requisitos: ["Omissão", "Contradição", "Obscuridade"],
  },
  especial: {
    nome: "Recurso Especial",
    requisitos: [
      "Prequestionamento",
      "Violação à Lei Federal",
      "Divergência Jurisprudencial",
    ],
  },
};

const RecursoPreview: React.FC<{
  formData: RecursoPreview;
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
  handleSaveDraft: () => void;
}> = ({
  formData,
  showPreview,
  setShowPreview,
  handleSaveDraft,
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const isPrinting = useStore((state) => state.isPrinting);
  const setIsPrinting = useStore((state) => state.setIsPrinting);
  const promiseResolveRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
      promiseResolveRef.current = null; // Limpa a referência para evitar loops
    }
  }, [isPrinting]);

  const handlePrint = useReactToPrint({
    contentRef: printRef, // Atualizado para a nova versão
    onBeforePrint: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      });
    },
    onAfterPrint: () => {
      setIsPrinting(false);
      toast.success("PDF gerado com sucesso!");
    },
  });

  return (
    <Dialog open={showPreview} onOpenChange={setShowPreview}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Visualização do Recurso</DialogTitle>
        </DialogHeader>

        <div
          ref={printRef}
          className="p-8 font-serif text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900"
        >
          <div className="space-y-8">
            <div className="text-center">
              <p className="uppercase font-bold">
                EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA{" "}
                {formData.vara || "[VARA]"} DO{" "}
                {formData.tribunal || "[TRIBUNAL]"}
              </p>
            </div>

            <div className="text-center">
              <p>
                Processo nº {formData.numeroProcesso || "[NÚMERO DO PROCESSO]"}
              </p>
            </div>

            <div>
              <p className="indent-8 text-justify">
                <span className="uppercase font-bold">
                  {formData.recorrente || "[RECORRENTE]"}
                </span>
                , já qualificado nos autos do processo em epígrafe, vem,
                respeitosamente, à presença de Vossa Excelência, por seu
                advogado que esta subscreve, apresentar
              </p>

              <p className="text-center font-bold uppercase my-6">
                {tiposRecurso[formData.tipoRecurso as keyof typeof tiposRecurso]
                  ?.nome || "RECURSO"}
              </p>
            </div>

            <div>
              <p className="indent-8 text-justify">
                contra a r. decisão de fls., pelos fatos e fundamentos a seguir
                expostos.
              </p>
            </div>

            {formData.razoes.map((razao: { titulo: string; conteudo: string }, index: number) => (
              <div key={index} className="space-y-4">
                <h2 className="font-bold uppercase">
                  {index + 1}. {razao.titulo || `RAZÃO RECURSAL ${index + 1}`}
                </h2>
                <div className="whitespace-pre-wrap text-justify indent-8">
                  {razao.conteudo || "Não especificado"}
                </div>
              </div>
            ))}

            <div className="space-y-4">
              <h2 className="font-bold uppercase">DOS PEDIDOS</h2>
              <div className="whitespace-pre-wrap text-justify indent-8">
                {formData.pedidos || "Ante o exposto, requer..."}
              </div>
            </div>

            <div className="text-center space-y-4 mt-12">
              <p>Termos em que,</p>
              <p>Pede deferimento.</p>
              <p>
                {formData.tribunal ? formData.tribunal.split(" ")[0] : "Local"},{" "}
                {new Date().toLocaleDateString("pt-BR")}
              </p>
              <div className="mt-16">
                <p className="border-t border-slate-400 dark:border-slate-600 w-64 mx-auto pt-2">
                  Advogado(a)
                </p>
                <p>OAB/XX 000.000</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleSaveDraft}
          >
            <MdSave size={18} />
            Salvar Rascunho
          </Button>
          <Button
            className="flex items-center gap-2"
            onClick={() => handlePrint()}
            disabled={isPrinting}
          >
            <MdPictureAsPdf size={18} />
            {isPrinting ? "Gerando PDF..." : "Exportar PDF"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
