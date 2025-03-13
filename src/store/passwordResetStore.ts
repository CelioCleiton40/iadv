import { create } from 'zustand';
import { z } from 'zod';

// Esquema de validação do e-mail usando zod
const emailSchema = z.string().trim().toLowerCase().email("Se este e-mail estiver cadastrado, você receberá um link para redefinição.");

interface PasswordResetState {
  email: string;
  isLoading: boolean;
  success: boolean;
  error: string | null;
  attempts: number;
  isLocked: boolean;
  setEmail: (email: string) => void;
  resetPassword: (email: string) => Promise<void>;
  resetState: () => void;
}

export const usePasswordResetStore = create<PasswordResetState>((set, get) => ({
  email: '',
  isLoading: false,
  success: false,
  error: null,
  attempts: 0,
  isLocked: false,

  setEmail: (email) => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      set({ error: result.error.errors[0].message });
    } else {
      set({ email: result.data, error: null });
    }
  },

  resetPassword: async (email) => {
    const { attempts, isLocked } = get();

    if (isLocked) {
      set({ error: "Muitas tentativas. Tente novamente mais tarde." });
      return;
    }

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      set({ error: result.error.errors[0].message });
      return;
    }

    try {
      set({ isLoading: true, error: null, attempts: attempts + 1 });

      // Simular chamada de API - Substituir pela API real
      await new Promise(resolve => setTimeout(resolve, 1500));

      set({ success: true, isLoading: false, error: null, attempts: 0 });
    } catch (error) {
      set({ error: "Se este e-mail estiver cadastrado, você receberá um link para redefinição.", isLoading: false });
    } finally {
      if (get().attempts >= 5) {
        set({ isLocked: true });
        setTimeout(() => set({ isLocked: false, attempts: 0 }), 300000); // Libera após 5 minutos
      }
    }
  },

  resetState: () => set({ 
    email: '', 
    isLoading: false, 
    success: false, 
    error: null, 
    attempts: 0, 
    isLocked: false 
  }),
}));
