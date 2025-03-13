import { create } from "zustand";
import { z } from "zod";

// Esquema de validação com Zod
const contactSchema = z.object({
  name: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres").max(50).trim(),
  email: z.string().email("Digite um e-mail válido").toLowerCase().trim(),
  message: z.string().min(10, "A mensagem precisa ter pelo menos 10 caracteres").max(500)
    .trim()
    .transform((val) => val.replace(/<\/?[^>]+(>|$)/g, "")), // Remove HTML
});

interface ContactState {
  name: string;
  email: string;
  message: string;
  searchTerm: string;
  submissionError: string | null;
  isSubmitting: boolean;
  submitted: boolean;
  setField: (field: string, value: string) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;
}

export const useContactStore = create<ContactState>((set, get) => ({
  name: "",
  email: "",
  message: "",
  searchTerm: "",
  submissionError: null,
  isSubmitting: false,
  submitted: false,

  // Atualiza os campos e valida os dados
  setField: (field, value) => {
    const currentState = get();
    const newState = { ...currentState, [field]: value };

    const parsed = contactSchema.safeParse(newState);
    if (!parsed.success) {
      set({ submissionError: "Por favor, corrija os erros antes de enviar!" });
      console.error("Erro de validação:", parsed.error.format());
    } else {
      set({ [field]: value, submissionError: null });
    }
  },

  // Envio do formulário com validação
  submitForm: async () => {
    const { name, email, message } = get();
    const parsed = contactSchema.safeParse({ name, email, message });

    if (!parsed.success) {
      set({ submissionError: "Preencha corretamente todos os campos!" });
      console.error("Erro de validação:", parsed.error.format());
      return;
    }

    set({ isSubmitting: true, submissionError: null });

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulando API
      alert("Mensagem enviada com sucesso!");
      set({ submitted: true });
    } catch (error) {
      set({ submissionError: "Erro ao enviar mensagem!" });
    } finally {
      set({ isSubmitting: false });
    }
  },

  // Reseta o formulário
  resetForm: () =>
    set({
      name: "",
      email: "",
      message: "",
      searchTerm: "",
      submitted: false,
      submissionError: null,
    }),
}));
