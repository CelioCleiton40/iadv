"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import DOMPurify from "dompurify";
import validator from "validator";
import { loginUser as loginService } from "@/services/auth";
import { AuthState, LoginCredentials, User } from "@/type/inter-face-login";
import  AuthError  from "next-auth";

// Função para validar credenciais de login
const validateLoginCredentials = (credentials: LoginCredentials): string | null => {
    if (!credentials.email.trim() || !validator.isEmail(credentials.email)) {
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
                // Validar credenciais
                const validationError = validateLoginCredentials(credentials);
                if (validationError) {
                    set({ error: validationError });
                    throw new Error(validationError);
                }

                // Sanitizar entradas
                const sanitizedCredentials = {
                    email: DOMPurify.sanitize(credentials.email.trim()),
                    password: credentials.password,
                };

                set({ isLoading: true, error: null });

                try {
                    // Chamar o serviço de login
                    const user: User = await loginService(sanitizedCredentials);
                    set({ user, isLoading: false });
                } catch (error: unknown) {
                    let errorMessage = "Erro ao tentar fazer login.";
                    if (error instanceof AuthError && 'response' in error && typeof error.response === 'object' && error.response && 'status' in error.response && error.response.status === 401) {
                        errorMessage = "Credenciais inválidas.";
                    } else if (error instanceof AuthError && 'response' in error && typeof error.response === 'object' && error.response && 'status' in error.response && error.response.status === 500) {
                        errorMessage = "Erro no servidor. Tente novamente mais tarde.";
                    } else if (error instanceof Error) {
                        errorMessage = error.message;
                    } else {
                        errorMessage = "Erro desconhecido. Verifique sua conexão de rede.";
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
            version: 1,
            migrate: (persistedState, version) => {
                if (version === 0) {
                    return Object.assign({}, persistedState as object, { version: 1 });
                }
                return persistedState;
            },
            onRehydrateStorage: () => {
                console.log("Hydrating auth storage...");
            },
        }
    )
);