import { create } from 'zustand';

interface PasswordResetState {
  email: string;
  isLoading: boolean;
  success: boolean;
  error: string | null;
  setEmail: (email: string) => void;
  resetPassword: (email: string) => Promise<void>;
  resetState: () => void;
}

export const usePasswordResetStore = create<PasswordResetState>((set) => ({
  email: '',
  isLoading: false,
  success: false,
  error: null,
  
  setEmail: (email) => set({ email }),
  
  resetPassword: async (email) => {
    try {
      set({ isLoading: true, error: null });
      
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
  
      set({ success: true, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Ocorreu um erro ao enviar o link de redefinição', 
        isLoading: false 
      });
    }
  },
  
  resetState: () => set({ 
    email: '', 
    isLoading: false, 
    success: false, 
    error: null 
  }),
}));