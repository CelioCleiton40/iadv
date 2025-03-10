import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser as loginService } from "@/services/auth";
import { AuthState } from "@/type/inter-face-login";



export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const user = await loginService(credentials);
          set({ user, isLoading: false });
        } catch (error) {
          set({ error: "Credenciais inválidas", isLoading: false });
          throw error;
        }
      },
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);