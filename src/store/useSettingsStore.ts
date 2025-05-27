import { create } from "zustand";

interface SettingsState {
  language: string;
  timezone: string;
  autoBackup: boolean;
  setLanguage: (lang: string) => void;
  setTimezone: (tz: string) => void;
  setAutoBackup: (value: boolean) => void;
  loadFromStorage: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: "pt-BR",
  timezone: "america-sp",
  autoBackup: true,
  setLanguage: (lang) => {
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    set({ language: lang });
  },
  setTimezone: (tz) => {
    localStorage.setItem("timezone", tz);
    set({ timezone: tz });
  },
  setAutoBackup: (value) => {
    localStorage.setItem("autoBackup", String(value));
    set({ autoBackup: value });
  },
  loadFromStorage: () => {
    const language = localStorage.getItem("language") || "pt-BR";
    const timezone = localStorage.getItem("timezone") || "america-sp";
    const autoBackup = localStorage.getItem("autoBackup") === "true";

    document.documentElement.lang = language;
    set({
      language,
      timezone,
      autoBackup,
    });
  },
}));
