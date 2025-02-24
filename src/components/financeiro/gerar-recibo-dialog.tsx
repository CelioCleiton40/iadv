"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdReceipt, MdDownload, MdPrint } from "react-icons/md";

interface GerarReciboDialogProps {
  transacao: {
    id: string;
    tipo: "receita" | "despesa";
    valor: number;
    data: string;
    cliente?: string;
    fornecedor?: string;
    descricao: string;
    processo?: string;
  };
}

export function GerarReciboDialog({ transacao }: GerarReciboDialogProps) {
  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement PDF generation and download
    console.log("Download PDF");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MdReceipt className="w-4 h-4 mr-2" />
          Gerar Recibo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Recibo</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-4">
          {/* Cabeçalho do Recibo */}
          <div className="text-center border-b pb-4">
            <h2 className="text-2xl font-bold mb-2">RECIBO</h2>
            <p className="text-lg font-semibold">
              {formatarValor(transacao.valor)}
            </p>
          </div>

          {/* Corpo do Recibo */}
          <div className="space-y-4">
            <p className="text-justify">
              Recebi(emos) de{" "}
              <span className="font-semibold">
                {transacao.tipo === "receita" ? transacao.cliente : "iAdv Manager"}
              </span>
              , a importância de{" "}
              <span className="font-semibold">
                {formatarValor(transacao.valor)}
              </span>
              {" "}referente a {transacao.descricao.toLowerCase()}.
            </p>

            {transacao.processo && (
              <p>
                Processo nº: <span className="font-semibold">{transacao.processo}</span>
              </p>
            )}

            <div className="pt-8 text-right">
              <p>São Paulo, {formatarData(transacao.data)}</p>
            </div>

            <div className="pt-16 text-center">
              <div className="border-t border-black w-64 mx-auto pt-2">
                <p>Assinatura</p>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button variant="outline" onClick={handlePrint}>
              <MdPrint className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
            <Button onClick={handleDownload}>
              <MdDownload className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}