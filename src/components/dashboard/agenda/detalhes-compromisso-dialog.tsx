

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdEvent, MdAccessTime, MdPerson, MdDescription, MdEdit, MdDelete } from "react-icons/md";

interface DetalhesCompromissoDialogProps {
  compromisso: {
    titulo: string;
    tipo: string;
    data: string;
    horario: string;
    cliente: string;
    processo?: string;
    descricao?: string;
  };
}

export function DetalhesCompromissoDialog({ compromisso }: DetalhesCompromissoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Ver Detalhes
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Compromisso</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
              <MdEvent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {compromisso.titulo}
              </h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {compromisso.tipo}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <MdAccessTime className="h-5 w-5" />
              <span>{compromisso.data} às {compromisso.horario}</span>
            </div>

            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <MdPerson className="h-5 w-5" />
              <span>Cliente: {compromisso.cliente}</span>
            </div>

            {compromisso.processo && (
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <MdDescription className="h-5 w-5" />
                <span>Processo: {compromisso.processo}</span>
              </div>
            )}

            {compromisso.descricao && (
              <div className="mt-4 space-y-2">
                <h3 className="font-medium text-slate-800 dark:text-slate-200">Descrição</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm whitespace-pre-wrap">
                  {compromisso.descricao}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex gap-2">
              <Button variant="destructive" size="sm">
                <MdDelete className="h-4 w-4 mr-1" />
                Excluir
              </Button>
              <Button variant="outline" size="sm">
                <MdEdit className="h-4 w-4 mr-1" />
                Editar
              </Button>
            </div>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                Fechar
              </Button>
            </DialogTrigger>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}