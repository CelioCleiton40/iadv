import { z } from "zod";
import bcrypt from "bcryptjs";

const registerSchema = z.object({
  firstName: z.string().trim().min(2, "Nome inválido"),
  lastName: z.string().trim().min(2, "Sobrenome inválido"),
  email: z.string().trim().toLowerCase().email("E-mail inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

export async function registerUser(userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  try {
    // Validação e sanitização
    const validatedData = registerSchema.parse(userData);

    // Criptografa a senha antes de enviar ao backend
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const sanitizedData = { ...validatedData, password: hashedPassword };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout de 10 segundos

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sanitizedData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao registrar usuário");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro no registro:", error);
    throw error;
  }
}

interface LoginData {
  email: string;
  password: string;
}

export async function loginUser(credentials: LoginData) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email.trim().toLowerCase(), // Normaliza o e-mail
        password: credentials.password,
      }),
    });

    if (!response.ok) {
      throw new Error("Credenciais inválidas");
    }

    const data = await response.json();

    if (data.token) {
      sessionStorage.setItem("auth_token", data.token); // Usa sessionStorage para mais segurança
    }

    return data;
  } catch (error) {
    throw new Error("Erro ao realizar login");
  }
}

export async function logoutUser() {
  try {
    sessionStorage.removeItem("auth_token");
    // Adicione outras operações necessárias para o logout
  } catch (error) {
    console.error("Erro ao realizar logout:", error);
  }
}

export function getAuthToken() {
  return sessionStorage.getItem("auth_token");
}

export function isAuthenticated() {
  return !!getAuthToken();
}
