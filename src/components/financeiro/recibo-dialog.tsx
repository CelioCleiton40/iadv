

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdReceipt, MdDownload, MdPrint } from "react-icons/md";

interface ReciboDialogProps {
  data: {
    numero: string;
    valor: number;
    pagador: string;
    descricao: string;
    processo?: string;
    data: string;
  };
}

export function ReciboDialog({ data }: ReciboDialogProps) {
  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const valorPorExtenso = (valor: number) => {
    // Implement number to words conversion
    return ""; // Temporary return
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 w-full mt-2"
        >
          <MdReceipt className="w-4 h-4" />
          Gerar Recibo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] md:max-w-[600px] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Recibo de Pagamento</DialogTitle>
        </DialogHeader>

        <div className="bg-white p-4 md:p-8 space-y-4 md:space-y-6 print:p-8">
          {/* Cabeçalho */}
          <div className="text-center border-b pb-4">
            <h2 className="text-xl md:text-2xl font-bold">RECIBO</h2>
            <p className="text-lg md:text-xl mt-2">Nº {data.numero}</p>
            <p className="text-xl md:text-2xl font-bold mt-4">{formatarValor(data.valor)}</p>
          </div>

          {/* Corpo */}
          <div className="space-y-4 md:space-y-6 text-sm md:text-base text-justify">
            <p className="leading-relaxed">
              Recebi(emos) de <span className="font-semibold">{data.pagador}</span>,
              a importância de <span className="font-semibold">{formatarValor(data.valor)}</span>
              {" "}({valorPorExtenso(data.valor)}),
              referente a {data.descricao}.
            </p>

            {data.processo && (
              <p className="leading-relaxed">
                Processo nº: <span className="font-semibold">{data.processo}</span>
              </p>
            )}

            <p className="leading-relaxed">
              Para clareza e documento do recebedor, firmo o presente recibo dando plena, 
              rasa e geral quitação.
            </p>

            <div className="text-right pt-4">
              <p>São Paulo, {formatarData(data.data)}</p>
            </div>

            <div className="pt-12 md:pt-16">
              <div className="border-t border-black w-full md:w-72 mx-auto pt-2 text-center">
                <p>Assinatura do Beneficiário</p>
                <p className="text-sm mt-1">CNPJ/CPF:</p>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-2 md:gap-4 pt-6 print:hidden">
            <Button variant="outline" onClick={() => window.print()}>
              <MdPrint className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
            <Button>
              <MdDownload className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}