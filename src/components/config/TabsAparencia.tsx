"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function TabsAparencia() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Tema</Label>
        <Select defaultValue="system">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Claro</SelectItem>
            <SelectItem value="dark">Escuro</SelectItem>
            <SelectItem value="system">Sistema</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Modo Compacto</Label>
          <p className="text-sm text-slate-600">Reduzir espaçamento entre elementos</p>
        </div>
        <Switch />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Animações</Label>
          <p className="text-sm text-slate-600">Habilitar animações na interface</p>
        </div>
        <Switch />
      </div>
    </div>
  );
}
