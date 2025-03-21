"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser as loginService } from "@/services/auth";
import { AuthState, LoginCredentials, User } from "@/type/inter-face-login";
import { AuthError } from "@/type/AuthError";

// Função para validar credenciais de login
const validateLoginCredentials = (credentials: LoginCredentials): string | null => {
    if (!credentials.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
        return "O e-mail fornecido é inválido.";
    }
    if (credentials.password.length < 8) {
        return "A senha deve ter pelo menos 8 caracteres.";
    }
    return null;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isLoading: false,
            error: null,

            login: async (credentials: LoginCredentials) => {
                // Validar credenciais antes de prosseguir
                const validationError = validateLoginCredentials(credentials);
                if (validationError) {
                    set({ error: validationError, isLoading: false });
                    throw new Error(validationError);
                }

                set({ isLoading: true, error: null });

                try {
                    // Chamar o serviço de login
                    const user: User = await loginService(credentials);
                    set({ user, isLoading: false });
                } catch (error: unknown) {
                    // Tratar erros específicos
                    const authError = error as AuthError;
                    let errorMessage = "Erro ao tentar fazer login.";
                    if (authError.response?.status === 401) {
                        errorMessage = "Credenciais inválidas.";
                    } else if (authError.response?.status === 500) {
                        errorMessage = "Erro no servidor. Tente novamente mais tarde.";
                    } else if (authError.message) {
                        errorMessage = authError.message;
                    }

                    set({ error: errorMessage, isLoading: false });
                    console.error("Erro no login:", authError);
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
            version: 1, // Versão da persistência
            onRehydrateStorage: () => {
                console.log("Hydrating auth storage...");
            },
        }
    )
);