"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function TabsPrivacidade() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Modo Privado</Label>
          <p className="text-sm text-slate-600">Ocultar informações sensíveis da tela</p>
        </div>
        <Switch />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Compartilhamento de Dados</Label>
          <p className="text-sm text-slate-600">Permitir compartilhamento com parceiros</p>
        </div>
        <Switch />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Histórico de Atividades</Label>
          <p className="text-sm text-slate-600">Salvar histórico de uso no dispositivo</p>
        </div>
        <Switch />
      </div>
    </div>
  );
}
