import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { DadosPessoaisForm } from "./forms/DadosPessoaisForm";
import { DadosProfissionaisForm } from "./forms/DadosProfissionaisForm";
import { SegurancaForm } from "./forms/SegurancaForm";
import { usePerfilStore } from "@/store/perfilStore";
import { toast } from "sonner";

export function PerfilContent() {
  const { validateAndSave, validateAndSaveSenha } = usePerfilStore();

  const handleSaveDadosPessoais = async () => {
    const isValid = await validateAndSave();
    if (isValid) {
      toast.success("Perfil salvo com sucesso!");
    } else {
      toast.error("Verifique os campos com erro.");
    }
  };

  const handleSaveSenha = async () => {
    const isValid = await validateAndSaveSenha();
    if (isValid) {
      toast.success("Senha alterada com sucesso!");
    } else {
      toast.error("Verifique os campos com erro.");
    }
  };

  return (
    <div className="lg:col-span-3">
      <Card className="p-6">
        <Tabs defaultValue="dados_pessoais" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="dados_pessoais">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="profissional">Dados Profissionais</TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          </TabsList>

          <TabsContent value="dados_pessoais">
            <DadosPessoaisForm onSave={handleSaveDadosPessoais} />
          </TabsContent>

          <TabsContent value="profissional">
            <DadosProfissionaisForm onSave={handleSaveDadosPessoais} />
          </TabsContent>

          <TabsContent value="seguranca">
            <SegurancaForm onSave={handleSaveSenha} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}