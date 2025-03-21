import { create } from "zustand";
import { z } from "zod";
import DOMPurify from "dompurify"; // Biblioteca para sanitização contra XSS

// Esquema de validação com Zod
export const contactSchema = z.object({
  name: z
    .string()
    .min(3, "O nome precisa ter pelo menos 3 caracteres")
    .max(50, "O nome não pode ter mais de 50 caracteres")
    .trim(),
  email: z
    .string()
    .email("Digite um e-mail válido")
    .toLowerCase()
    .trim(),
  message: z
    .string()
    .min(10, "A mensagem precisa ter pelo menos 10 caracteres")
    .max(500, "A mensagem não pode ter mais de 500 caracteres")
    .trim()
    .transform((val) => DOMPurify.sanitize(val)), // Remove scripts maliciosos
});

export interface ContactState {
  name: string;
  email: string;
  message: string;
  searchTerm: string;
  submissionError: string | null;
  isSubmitting: boolean;
  submitted: boolean;
  setField: (field: keyof ContactState, value: string) => void;
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
    const sanitizedValue = DOMPurify.sanitize(value); // Sanitiza a entrada
    const currentState = get();
    const newState = { ...currentState, [field]: sanitizedValue };

    const parsed = contactSchema.partial().safeParse(newState);
    if (!parsed.success) {
      const errors = parsed.error.format();
      const firstError = Object.values(errors)[0];
      const errorMessage = typeof firstError === 'object' && '_errors' in firstError 
        ? firstError._errors[0] 
        : "Erro de validação.";
      set({ submissionError: errorMessage });
    } else {
      set({ [field]: sanitizedValue, submissionError: null });
    }
  },

  // Envio do formulário com validação
  submitForm: async () => {
    const { name, email, message } = get();
    const parsed = contactSchema.safeParse({ name, email, message });

    if (!parsed.success) {
      const errors = parsed.error.format();
      const firstError = Object.values(errors)[0];
      const errorMessage = typeof firstError === 'object' && '_errors' in firstError 
        ? firstError._errors[0] 
        : "Erro de validação.";
      set({ submissionError: errorMessage });
      return;
    }

    set({ isSubmitting: true, submissionError: null });

    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula chamada assíncrona
      set({ submitted: true });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
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