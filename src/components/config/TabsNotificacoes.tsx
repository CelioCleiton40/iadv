"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TabsNotificacoes() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Notificações por Email</Label>
          <p className="text-sm text-slate-600">Receber alertas por email</p>
        </div>
        <Switch />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Notificações Push</Label>
          <p className="text-sm text-slate-600">Receber notificações no navegador</p>
        </div>
        <Switch />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Alertas de Prazos</Label>
          <p className="text-sm text-slate-600">Notificar sobre prazos próximos</p>
        </div>
        <Switch />
      </div>

      <div className="space-y-2">
        <Label>Antecedência dos Alertas</Label>
        <Select defaultValue="3">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 dia antes</SelectItem>
            <SelectItem value="3">3 dias antes</SelectItem>
            <SelectItem value="7">7 dias antes</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}