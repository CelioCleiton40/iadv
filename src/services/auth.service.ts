import axios from "axios";
import DOMPurify from "dompurify";
import { LoginFormData } from "@/lib/validationSchemas";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/auth/login";

export class AuthService {
  /**
   * Realiza o login via API própria com e-mail e senha.
   * Armazena o token localmente e retorna os dados do usuário.
   */
  static async login(data: LoginFormData) {
    try {
      const sanitizedEmail = DOMPurify.sanitize(data.email || "").trim();
      const sanitizedPassword = DOMPurify.sanitize(data.password || "").trim();

      if (!sanitizedEmail || !sanitizedPassword) {
        throw new Error("Email e senha são obrigatórios.");
      }

      const response = await axios.post(API_URL, {
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      const result = response.data;

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      return result;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Erro ao tentar login.";
      console.error("Erro ao tentar login:", message);
      throw new Error(message);
    }
  }

  static loginWithGoogle() {
    throw new Error("Login com Google não implementado na API.");
  }
}
