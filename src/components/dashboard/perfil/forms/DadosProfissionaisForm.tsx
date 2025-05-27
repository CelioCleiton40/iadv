import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePerfilStore } from "@/store/perfilStore";
import { MdSave } from "react-icons/md";
import { FormEvent } from "react";

interface DadosProfissionaisFormProps {
  onSave: () => Promise<void>;
}

export function DadosProfissionaisForm({ onSave }: DadosProfissionaisFormProps) {
  const { perfil, updateField } = usePerfilStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSave();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Número OAB</Label>
          <Input
            value={perfil.data.oab}
            onChange={(e) => updateField("oab", e.target.value)}
            placeholder="123456"
          />
          {perfil.errors.oab && (
            <span className="text-red-500 text-sm">{perfil.errors.oab}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label>Seccional</Label>
          <Input
            value={perfil.data.estado}
            onChange={(e) => updateField("estado", e.target.value.toUpperCase())}
            placeholder="RN"
          />
          {perfil.errors.estado && (
            <span className="text-red-500 text-sm">{perfil.errors.estado}</span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Áreas de Atuação</Label>
        <Input
          value={perfil.data.especialidade}
          onChange={(e) => updateField("especialidade", e.target.value)}
          placeholder="Direito Penal, Direito Familiar"
        />
        {perfil.errors.especialidade && (
          <span className="text-red-500 text-sm">
            {perfil.errors.especialidade}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label>Escritório</Label>
        <Input
          value={perfil.data.escritorio}
          onChange={(e) => updateField("escritorio", e.target.value)}
          placeholder="Oliveira Advocacia"
        />
        {perfil.errors.escritorio && (
          <span className="text-red-500 text-sm">
            {perfil.errors.escritorio}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Data de Inscrição OAB</Label>
          <Input
            type="date"
            value={perfil.data.dataInscricaoOAB?.split("T")[0] || ""}
            onChange={(e) =>
              updateField(
                "dataInscricaoOAB",
                `${e.target.value}T00:00:00.000Z`
              )
            }
          />
          {perfil.errors.dataInscricaoOAB && (
            <span className="text-red-500 text-sm">
              {perfil.errors.dataInscricaoOAB}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label>Situação</Label>
          <Input
            value={perfil.data.situacao}
            onChange={(e) => updateField("situacao", e.target.value)}
            placeholder="Ativa"
          />
          {perfil.errors.situacao && (
            <span className="text-red-500 text-sm">
              {perfil.errors.situacao}
            </span>
          )}
        </div>
      </div>

      <Button
        className="w-full mt-6"
        type="submit"
        disabled={perfil.loading}
      >
        {perfil.loading ? (
          "Salvando..."
        ) : (
          <>
            <MdSave className="mr-2 h-4 w-4" /> Salvar Alterações
          </>
        )}
      </Button>
    </form>
  );
}