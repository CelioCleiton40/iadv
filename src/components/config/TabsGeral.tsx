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

// Tradução simplificada (mock)
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
  const router = useRouter();
  const { toast } = useToast();

  const [currentLanguage, setCurrentLanguage] = useState("pt-BR");
  const [timezone, setTimezone] = useState("america-sp");
  const [autoBackup, setAutoBackup] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "pt-BR";
    const savedTimezone = localStorage.getItem("timezone") || "america-sp";
    const savedBackup = localStorage.getItem("autoBackup") === "true";

    setCurrentLanguage(savedLanguage);
    setTimezone(savedTimezone);
    setAutoBackup(savedBackup);
    document.documentElement.lang = savedLanguage;

    setMounted(true);
  }, []);

  const handleLanguageChange = (lang: string) => {
    localStorage.setItem("language", lang);
    setCurrentLanguage(lang);
    document.documentElement.lang = lang;
    router.refresh();
  };

  const handleTimezoneChange = (tz: string) => {
    localStorage.setItem("timezone", tz);
    setTimezone(tz);
  };

  const handleSave = () => {
    localStorage.setItem("autoBackup", String(autoBackup));
    router.refresh();

    toast({
      title: t(currentLanguage, "saved"),
      duration: 3000,
    });
  };

  return (
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>{t(currentLanguage, "language")}</Label>
            {mounted && (
              <Select
                value={currentLanguage}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={t(currentLanguage, "selectLanguage")}
                  />
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
            <Label>{t(currentLanguage, "timezone")}</Label>
            {mounted && (
              <Select value={timezone} onValueChange={handleTimezoneChange}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={t(currentLanguage, "selectTimezone")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="america-sp">América/São Paulo</SelectItem>
                  <SelectItem value="america-rj">
                    América/Rio de Janeiro
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/50">
          <div className="space-y-0.5">
            <Label>{t(currentLanguage, "backup")}</Label>
            <p className="text-sm text-muted-foreground">
              {t(currentLanguage, "backupDesc")}
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
            {t(currentLanguage, "save")}
          </Button>
        </div>
      </CardContent>
  );
}
