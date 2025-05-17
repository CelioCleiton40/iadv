import apiClient from "@/lib/axiosConfig"; // Assume que este é seu cliente Axios configurado
import { Perfil } from "@/type/inter-face-perfil"; // Sua definição de tipo para Perfil
import { AxiosError } from "axios"; // Importar AxiosError para tipagem de erro mais precisa

// Interface para a estrutura esperada de erro da API
interface ApiErrorResponse {
  message: string;
  // Outros campos de erro que sua API pode retornar
}

/**
 * Obtém o perfil do usuário logado.
 * @returns Promise<Perfil> - Os dados do perfil do usuário.
 * @throws Error - Se não for possível carregar o perfil.
 */
export const getPerfil = async (): Promise<Perfil> => {
  try {
    const response = await apiClient.get<Perfil>("/perfil");
    return response.data;
  } catch (error: unknown) { // Usar 'unknown' e depois verificar o tipo é mais seguro
    console.error("Erro ao buscar perfil:", error);
    let mensagem = "Não foi possível carregar o perfil.";
    if (error instanceof AxiosError && error.response?.data) {
      const apiError = error.response.data as ApiErrorResponse;
      if (apiError.message) {
        mensagem = apiError.message;
      }
    }
    throw new Error(mensagem);
  }
};

/**
 * Cria um novo perfil.
 * @param data - Os dados do perfil a ser criado.
 * @returns Promise<Perfil> - O perfil criado (se o backend retornar o objeto criado).
 * Promise<void> - Se o backend não retornar o objeto (apenas status de sucesso).
 * (Vamos assumir que o backend retorna o perfil criado para este exemplo)
 * @throws Error - Se ocorrer um erro ao criar o perfil.
 */
export const createPerfil = async (data: Perfil): Promise<Perfil> => { // Alterado para retornar Perfil
  try {
    const response = await apiClient.post<Perfil>("/perfil", data); // Espera que o backend retorne o perfil
    return response.data;
  } catch (error: unknown) {
    console.error("Erro ao criar perfil:", error);
    let mensagem = "Erro ao criar perfil.";
    if (error instanceof AxiosError && error.response?.data) {
      const apiError = error.response.data as ApiErrorResponse;
      if (apiError.message) {
        mensagem = apiError.message;
      }
    }
    throw new Error(mensagem);
  }
};

/**
 * Atualiza um perfil existente (geralmente o do usuário logado).
 * @param data - Os dados do perfil a serem atualizados.
 * @returns Promise<Perfil> - O perfil atualizado (se o backend retornar o objeto atualizado).
 * Promise<void> - Se o backend não retornar o objeto (apenas status de sucesso).
 * (Vamos assumir que o backend retorna o perfil atualizado para este exemplo)
 * @throws Error - Se ocorrer um erro ao atualizar o perfil.
 */
export const updatePerfil = async (data: Perfil): Promise<Perfil> => { // Alterado para retornar Perfil
  try {
    // Se você precisar passar um ID para atualizar um perfil específico, seria algo como:
    // const response = await apiClient.put<Perfil>(`/perfil/${data.id}`, data);
    // Assumindo que /perfil atualiza o perfil logado:
    const response = await apiClient.put<Perfil>("/perfil", data); // Espera que o backend retorne o perfil
    return response.data;
  } catch (error: unknown) {
    console.error("Erro ao atualizar perfil:", error);
    let mensagem = "Erro ao atualizar perfil.";
    if (error instanceof AxiosError && error.response?.data) {
      const apiError = error.response.data as ApiErrorResponse;
      if (apiError.message) {
        mensagem = apiError.message;
      }
    }
    throw new Error(mensagem);
  }
};

/**
 * Troca a senha do usuário logado.
 * @param senhaAtual - A senha atual do usuário.
 * @param novaSenha - A nova senha desejada.
 * @returns Promise<string> - Uma mensagem de sucesso.
 * @throws Error - Se ocorrer um erro ao tentar alterar a senha.
 */
export const changePassword = async ({
  senhaAtual,
  novaSenha,
}: {
  senhaAtual: string;
  novaSenha: string;
}): Promise<string> => {
  try {
    const response = await apiClient.post<{ message: string }>("/perfil/trocar-senha", { // Tipando a resposta esperada
      senhaAtual,
      novaSenha,
    });
    return response.data?.message || "Senha alterada com sucesso.";
  } catch (error: unknown) {
    console.error("Erro ao trocar senha:", error);
    let mensagem = "Erro ao tentar alterar a senha.";
    if (error instanceof AxiosError && error.response?.data) {
      const apiError = error.response.data as ApiErrorResponse; // Reutiliza a interface de erro
      if (apiError.message) {
        mensagem = apiError.message;
      }
    }
    throw new Error(mensagem);
  }
};

/**
 * Exclui completamente o perfil do usuário logado.
 * @returns Promise<void> - Indica que a operação foi concluída.
 * @throws Error - Se ocorrer um erro ao excluir o perfil.
 */
export const deletePerfilCompleto = async (): Promise<void> => {
  try {
    await apiClient.delete("/perfil");
  } catch (error: unknown) {
    console.error("Erro ao excluir perfil:", error);
    let mensagem = "Erro ao excluir perfil.";
    if (error instanceof AxiosError && error.response?.data) {
      const apiError = error.response.data as ApiErrorResponse;
      if (apiError.message) {
        mensagem = apiError.message;
      }
    }
    throw new Error(mensagem);
  }
};