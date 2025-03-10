import { create } from 'zustand';

interface ContactState {
  name: string;
  email: string;
  message: string;
  isSubmitting: boolean;
  setField: (field: string, value: string) => void;
  submitForm: () => Promise<void>;
}

export const useContactStore = create<ContactState>((set) => ({
  name: '',
  email: '',
  message: '',
  isSubmitting: false,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  submitForm: async () => {
    set({ isSubmitting: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulando API
      alert('Mensagem enviada com sucesso!');
    } catch (error) {
      alert('Erro ao enviar mensagem!');
    } finally {
      set({ isSubmitting: false });
    }
  },
}));