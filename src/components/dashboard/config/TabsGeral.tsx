"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MdSave } from "react-icons/md";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useSettingsStore } from "@/store/useSettingsStore";

// Tradução simplificada
const translations: Record<string, Record<string, string>> = {
  "pt-BR": {
    language: "Idioma do Sistema",
    timezone: "Fuso Horário",
    backup: "Backup Automático",
    backupDesc: "Realizar backup diário dos dados",
    save: "Salvar Alterações",
    saved: "Configurações salvas com sucesso!",
    selectLanguage: "Selecione o idioma",
    selectTimezone: "Selecione o fuso",
  },
  en: {
    language: "System Language",
    timezone: "Time Zone",
    backup: "Automatic Backup",
    backupDesc: "Perform daily data backup",
    save: "Save Changes",
    saved: "Settings saved successfully!",
    selectLanguage: "Select language",
    selectTimezone: "Select timezone",
  },
  es: {
    language: "Idioma del Sistema",
    timezone: "Zona Horaria",
    backup: "Respaldo Automático",
    backupDesc: "Realizar respaldo diario de los datos",
    save: "Guardar Cambios",
    saved: "¡Configuraciones guardadas con éxito!",
    selectLanguage: "Selecciona idioma",
    selectTimezone: "Selecciona zona horaria",
  },
};

function t(lang: string, key: string) {
  return translations[lang]?.[key] || key;
}

export default function TabsGeral() {
  const {
    language,
    timezone,
    autoBackup,
    setLanguage,
    setTimezone,
    setAutoBackup,
    loadFromStorage,
  } = useSettingsStore();

  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    loadFromStorage();
    setMounted(true);
  }, [loadFromStorage]);

  const handleSave = () => {
    // autoBackup já está salvo no onChange
    router.refresh();
    toast({
      title: t(language, "saved"),
      duration: 3000,
    });
  };

  return (
    <CardContent className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="language-select">{t(language, "language")}</Label>
          {mounted && (
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language-select">
                <SelectValue placeholder={t(language, "selectLanguage")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone-select">{t(language, "timezone")}</Label>
          {mounted && (
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger id="timezone-select">
                <SelectValue placeholder={t(language, "selectTimezone")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="america-sp">América/São Paulo</SelectItem>
                <SelectItem value="america-rj">América/Rio de Janeiro</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/50">
        <div className="space-y-0.5">
          <Label>{t(language, "backup")}</Label>
          <p className="text-sm text-muted-foreground">
            {t(language, "backupDesc")}
          </p>
        </div>
        <Switch
          checked={autoBackup}
          onCheckedChange={setAutoBackup}
          aria-label="Ativar backup automático"
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <MdSave className="h-5 w-5" />
          {t(language, "save")}
        </Button>
      </div>
    </CardContent>
  );
}
