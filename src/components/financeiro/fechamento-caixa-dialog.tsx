

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdAccountBalance } from "react-icons/md";

export function FechamentoCaixaDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2" size="sm">
          <MdAccountBalance className="w-4 h-4" />
          Fechamento de Caixa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Fechamento de Caixa - Março/2024</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Entradas</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span>Honorários</span>
                  <span className="font-medium">R$ 25.450,00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span>Custas Processuais</span>
                  <span className="font-medium">R$ 3.200,00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span>Acordos</span>
                  <span className="font-medium">R$ 12.000,00</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-100 dark:bg-green-900/40 rounded-lg font-semibold">
                <span>Total Entradas</span>
                <span>R$ 40.650,00</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Saídas</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span>Custas Processuais</span>
                  <span className="font-medium">R$ 5.320,00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span>Despesas Escritório</span>
                  <span className="font-medium">R$ 2.150,00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span>Outras Despesas</span>
                  <span className="font-medium">R$ 850,00</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-100 dark:bg-red-900/40 rounded-lg font-semibold">
                <span>Total Saídas</span>
                <span>R$ 8.320,00</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg font-semibold text-lg">
              <span>Saldo Final</span>
              <span className="text-blue-600 dark:text-blue-400">R$ 32.330,00</span>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Exportar PDF</Button>
            <Button>Fechar Caixa</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}