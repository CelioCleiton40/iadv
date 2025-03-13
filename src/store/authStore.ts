import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser as loginService } from "@/services/auth";
import { AuthState, LoginCredentials, User } from "@/type/inter-face-login";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const user: User = await loginService(credentials);
          set({ user, isLoading: false });
        } catch (error) {
          set({ error: "Credenciais inválidas", isLoading: false });
          console.error("Erro no login:", error);
          throw error;
        }
      },

      logout: () => set({ user: null, error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
