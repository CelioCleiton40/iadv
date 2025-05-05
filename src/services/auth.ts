import DOMPurify from "dompurify";
import axios from "axios";
import { registerSchema } from "@/lib/validationSchemas";

// Função para validar a força da senha
function validatePasswordStrength(password: string): boolean {
  const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
}

// REGISTRAR USUÁRIO
export async function registerUser(userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  try {
    // Verifica a força da senha
    if (!validatePasswordStrength(userData.password)) {
      throw new Error("A senha não atende aos requisitos de segurança.");
    }

    // Sanitização dos dados
    const sanitizedData = {
      firstName: DOMPurify.sanitize(userData.firstName),
      lastName: DOMPurify.sanitize(userData.lastName),
      email: DOMPurify.sanitize(userData.email),
      password: userData.password,
    };

    // Validação com schema Zod
    const validatedData = registerSchema.parse(sanitizedData);

    // Requisição com timeout de 10 segundos
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await axios.post(
      "http://localhost:3001/api/users",
      validatedData,
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
