

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdAnalytics, MdDownload } from "react-icons/md";
import * as z from "zod";

const formSchema = z.object({
  tipoRelatorio: z.string(),
  dataInicio: z.string(),
  dataFim: z.string(),
  formato: z.string(),
});

export function RelatorioDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoRelatorio: "",
      dataInicio: "",
      dataFim: "",
      formato: "pdf",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Implement report generation logic here
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2" size="sm">
          <MdAnalytics className="w-4 h-4" />
          Gerar Relatório
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gerar Relatório</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="tipoRelatorio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Relatório</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de relatório" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="financeiro">Relatório Financeiro</SelectItem>
                      <SelectItem value="receitas">Relatório de Receitas</SelectItem>
                      <SelectItem value="despesas">Relatório de Despesas</SelectItem>
                      <SelectItem value="honorarios">Relatório de Honorários</SelectItem>
                      <SelectItem value="processos">Relatório por Processo</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dataInicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Início</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataFim"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Fim</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="formato"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Formato do Relatório</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o formato" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4 pt-4">
              <Button type="submit" className="flex items-center gap-2">
                <MdDownload className="w-4 h-4" />
                Gerar Relatório
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}