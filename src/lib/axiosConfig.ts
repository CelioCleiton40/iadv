// Arquivo: axiosConfig.ts

import axios from "axios";
import { isAxiosError } from "axios";

// Criação da instância do Axios com configurações seguras
const apiClient = axios.create({
  baseURL: "http://localhost:3001/api", // Substitua pela URL real da sua API
  timeout: 10000, // Tempo máximo para resposta
  headers: {
    "Content-Type": "application/json",
    "X-Content-Type-Options": "nosniff", // Prevenir MIME type sniffing
    "X-Requested-With": "XMLHttpRequest", // Marca requisições como AJAX
  },
  maxBodyLength: 10 * 1024 * 1024, // Limite de 10MB para o corpo da requisição
});

// Interceptor de requisição: adicionar token JWT se disponível
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Evita enviar dados sensíveis no log
    if (process.env.NODE_ENV !== "development") {
      console.log = () => {}; // Desativa logs em produção (opcional)
    }

    return config;
  },
  (error) => {
    // Erro antes da requisição ser feita
    console.error("[Interceptor Request] Erro na requisição:", error);
    return Promise.reject(error);
  }
);

// Interceptor de resposta: tratar respostas e erros globais
apiClient.interceptors.response.use(
  (response) => {
    // Valida que a resposta é do tipo JSON esperado
    const contentType = response.headers["content-type"];
    if (contentType && !contentType.includes("application/json")) {
      return Promise.reject(new Error("Resposta insegura ou inválida"));
    }

    return response;
  },
  (error) => {
    if (isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        console.warn("Timeout da requisição excedido");
        return Promise.reject(new Error("A conexão expirou. Tente novamente."));
      }

      if (error.response) {
        // Servidor respondeu com status fora do range 2xx
        const { status, data } = error.response;

        if (status === 401) {
          // Token expirado ou inválido
          localStorage.removeItem("token");
          window.location.href = "/login"; // Redireciona para login
        }

        if (status === 403) {
          return Promise.reject(new Error("Acesso negado"));
        }

        if (status >= 500) {
          return Promise.reject(new Error("Erro interno no servidor"));
        }

        return Promise.reject(new Error(data.message || "Erro na requisição"));
      }

      if (!error.response) {
        // Sem resposta do servidor
        return Promise.reject(new Error("Sem conexão com o servidor"));
      }
    }

    return Promise.reject(new Error("Ocorreu um erro desconhecido"));
  }
);

export default apiClient;