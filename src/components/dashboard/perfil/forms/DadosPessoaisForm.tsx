import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePerfilStore } from "@/store/perfilStore";
import { MdSave } from "react-icons/md";
import { FormEvent } from "react";

interface DadosPessoaisFormProps {
  onSave: () => Promise<void>;
}

export function DadosPessoaisForm({ onSave }: DadosPessoaisFormProps) {
  const { perfil, updateField } = usePerfilStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSave();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nome Completo</Label>
          <Input
            value={perfil.data.nome}
            onChange={(e) => updateField("nome", e.target.value)}
            placeholder="Seu nome completo"
          />
          {perfil.errors.nome && (
            <span className="text-red-500 text-sm">{perfil.errors.nome}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label>CPF</Label>
          <Input
            value={perfil.data.cpf}
            onChange={(e) => updateField("cpf", e.target.value)}
            placeholder="12345678901"
          />
          {perfil.errors.cpf && (
            <span className="text-red-500 text-sm">{perfil.errors.cpf}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={perfil.data.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="seu@email.com"
          />
          {perfil.errors.email && (
            <span className="text-red-500 text-sm">{perfil.errors.email}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label>Telefone</Label>
          <Input
            value={perfil.data.telefone}
            onChange={(e) => updateField("telefone", e.target.value)}
            placeholder="84999887766"
          />
          {perfil.errors.telefone && (
            <span className="text-red-500 text-sm">
              {perfil.errors.telefone}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Data de Nascimento</Label>
          <Input
            type="date"
            value={perfil.data.dataNascimento.split("T")[0]}
            onChange={(e) =>
              updateField(
                "dataNascimento",
                `${e.target.value}T00:00:00.000Z`
              )
            }
          />
          {perfil.errors.dataNascimento && (
            <span className="text-red-500 text-sm">
              {perfil.errors.dataNascimento}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label>Estado Civil</Label>
          <Input
            value={perfil.data.estadoCivil}
            onChange={(e) => updateField("estadoCivil", e.target.value)}
            placeholder="Solteiro/Casado/etc"
          />
          {perfil.errors.estadoCivil && (
            <span className="text-red-500 text-sm">
              {perfil.errors.estadoCivil}
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