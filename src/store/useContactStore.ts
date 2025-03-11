import { create } from 'zustand';

interface ContactState {
  name: string;
  email: string;
  message: string;
  searchTerm: string; // Novo estado
  submissionError: string | null;
  isSubmitting: boolean;
  submitted: boolean; // Novo estado
  setField: (field: string, value: string) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void; // Novo método para resetar o formulário
}

export const useContactStore = create<ContactState>((set) => ({
  name: '',
  email: '',
  message: '',
  searchTerm: '', // Inicializando o novo estado
  submissionError: null,
  isSubmitting: false,
  submitted: false, // Inicializando o novo estado
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  submitForm: async () => {
    set({ isSubmitting: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulando API
      alert('Mensagem enviada com sucesso!');
      set({ submitted: true }); // Atualiza o estado de submitted
    } catch (error) {
      alert('Erro ao enviar mensagem!');
    } finally {
      set({ isSubmitting: false });
    }
  },
  resetForm: () => set({ name: '', email: '', message: '', searchTerm: '', submitted: false }), // Método para resetar o formulário
}));