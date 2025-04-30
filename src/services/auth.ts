import bcrypt from "bcryptjs";
import DOMPurify from "dompurify";
import axios from "axios";
import { registerSchema } from "@/lib/validationSchemas";

// REGISTRAR USUÁRIO
export async function registerUser(userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  try {
    const sanitizedData = {
      firstName: DOMPurify.sanitize(userData.firstName),
      lastName: DOMPurify.sanitize(userData.lastName),
      email: DOMPurify.sanitize(userData.email),
      password: userData.password,
      confirmPassword: userData.password,
    };

    const validatedData = registerSchema.parse(sanitizedData);
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const secureData = { ...validatedData, password: hashedPassword };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await axios.post(
      "http://localhost:3001/api/users",
      secureData,
      {
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);
    return response.data;
  } catch (error: any) {
    console.error("Erro no registro:", error);
    throw new Error(error.response?.data?.message || "Erro ao registrar usuário");
  }
}

// LOGIN
interface LoginData {
  email: string;
  password: string;
}

export async function loginUser(credentials: LoginData) {
  try {
    const sanitizedCredentials = {
      email: DOMPurify.sanitize(credentials.email.trim().toLowerCase()),
      password: credentials.password,
    };

    const response = await axios.post(
      "http://localhost:3001/api/auth/login",
      sanitizedCredentials,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const { token, user } = response.data;

    // Armazena o token no localStorage
    localStorage.setItem("token", token);

    return user;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao realizar login");
  }
}

// LOGOUT
export function logoutUser() {
  localStorage.removeItem("token");
}

// CHECA AUTENTICAÇÃO
export async function isAuthenticated(): Promise<boolean> {
  try {
    const token = localStorage.getItem("token");

    if (!token) return false;

    const response = await axios.get("http://localhost:3001/api/auth/check", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status === 200;
  } catch {
    return false;
  }
}
