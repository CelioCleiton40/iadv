import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().min(2, "Nome inválido"),
  lastName: z.string().min(2, "Sobrenome inválido"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

export async function registerUser(userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  try {
    // Validação dos dados
    const validatedData = registerSchema.parse(userData);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout de 10 segundos

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message ||
        (response.status === 400
          ? "Dados inválidos"
          : response.status === 409
          ? "E-mail já registrado"
          : "Erro desconhecido");
      throw new Error(errorMessage);
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
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Credenciais inválidas');
    }

    const data = await response.json();
    
    // Armazena o token no localStorage
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }

    return data;
  } catch (error) {
    throw new Error('Erro ao realizar login');
  }
}

export async function logoutUser() {
  try {
    localStorage.removeItem('auth_token');
    // Adicione aqui qualquer lógica adicional de logout
  } catch (error) {
    console.error('Erro ao realizar logout:', error);
  }
}

export function getAuthToken() {
  return localStorage.getItem('auth_token');
}

export function isAuthenticated() {
  return !!getAuthToken();
}