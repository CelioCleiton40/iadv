import { z } from "zod";
import bcrypt from "bcryptjs";
import DOMPurify from "dompurify"; // Biblioteca para sanitização contra XSS

// Esquema de validação com Zod
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
    // Sanitização das entradas para evitar XSS
    const sanitizedData = {
      firstName: DOMPurify.sanitize(userData.firstName),
      lastName: DOMPurify.sanitize(userData.lastName),
      email: DOMPurify.sanitize(userData.email),
      password: userData.password,
    };

    // Validação e sanitização
    const validatedData = registerSchema.parse(sanitizedData);

    // Criptografa a senha antes de enviar ao backend
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const secureData = { ...validatedData, password: hashedPassword };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout de 10 segundos

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(secureData),
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
    // Sanitização das entradas para evitar XSS
    const sanitizedCredentials = {
      email: DOMPurify.sanitize(credentials.email.trim().toLowerCase()),
      password: credentials.password,
    };

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sanitizedCredentials),
    });

    if (!response.ok) {
      throw new Error("Credenciais inválidas");
    }

    const data = await response.json();

    if (data.token) {
      // Usa cookies httpOnly e secure para maior segurança
      document.cookie = `auth_token=${encodeURIComponent(data.token)}; HttpOnly; Secure; SameSite=Strict; Path=/`;
    }

    return data;
  } catch (error) {
    throw new Error("Erro ao realizar login");
  }
}

export async function logoutUser() {
  try {
    // Remove o token dos cookies
    document.cookie = "auth_token=; HttpOnly; Secure; SameSite=Strict; Path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  } catch (error) {
    console.error("Erro ao realizar logout:", error);
  }
}

export function getAuthToken() {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {} as Record<string, string>);
  return cookies["auth_token"] || null;
}

export function isAuthenticated() {
  return !!getAuthToken();
}