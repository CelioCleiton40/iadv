import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePerfilStore } from "@/store/perfilStore";
import { MdLock } from "react-icons/md";
import { FormEvent } from "react";

interface SegurancaFormProps {
  onSave: () => Promise<void>;
}

export function SegurancaForm({ onSave }: SegurancaFormProps) {
  const { perfilSenha, updatePerfilSenha } = usePerfilStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSave();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label>Senha Atual</Label>
        <Input
          type="password"
          value={perfilSenha.data.senhaAtual}
          onChange={(e) => updatePerfilSenha("senhaAtual", e.target.value)}
          placeholder="••••••••"
        />
        {perfilSenha.errors.senhaAtual && (
          <span className="text-red-500 text-sm">
            {perfilSenha.errors.senhaAtual}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <Label>Nova Senha</Label>
        <Input
          type="password"
          value={perfilSenha.data.novaSenha}
          onChange={(e) => updatePerfilSenha("novaSenha", e.target.value)}
          placeholder="••••••••"
        />
        {perfilSenha.errors.novaSenha && (
          <span className="text-red-500 text-sm">
            {perfilSenha.errors.novaSenha}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <Label>Confirmar Nova Senha</Label>
        <Input
          type="password"
          value={perfilSenha.data.confirmarSenha}
          onChange={(e) => updatePerfilSenha("confirmarSenha", e.target.value)}
          placeholder="••••••••"
        />
        {perfilSenha.errors.confirmarSenha && (
          <span className="text-red-500 text-sm">
            {perfilSenha.errors.confirmarSenha}
          </span>
        )}
      </div>

      <Button
        className="w-full mt-6"
        type="submit"
        disabled={perfilSenha.loading}
      >
        {perfilSenha.loading ? (
          "Alterando..."
        ) : (
          <>
            <MdLock className="mr-2 h-4 w-4" /> Alterar Senha
          </>
        )}
      </Button>
    </form>
  );
}