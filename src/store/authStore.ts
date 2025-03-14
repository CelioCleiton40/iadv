"use client"

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
        } catch (error: any) {
          let errorMessage = "Erro ao tentar fazer login.";
          if (error.response?.status === 401) {
            errorMessage = "Credenciais inválidas.";
          } else if (error.response?.status === 500) {
            errorMessage = "Erro no servidor. Tente novamente mais tarde.";
          }
          set({ error: errorMessage, isLoading: false });
          console.error("Erro no login:", error);
          throw new Error(errorMessage);
        }
      },

      logout: () => {
        set({ user: null, error: null, isLoading: false });
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
