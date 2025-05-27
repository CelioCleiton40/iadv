import apiClient from '@/lib/axiosConfig';
import { ConsultaProcesso, Processo } from '@/type/inter-face-processo';
import { AxiosError } from 'axios';

interface ApiErrorResponse {
  message: string;
}

/**
 * Consulta processos por CPF, nome ou número.
 * @param params - Parâmetros da consulta (termo e tipo)
 * @returns Promise<Processo[]> - Lista de processos encontrados
 * @throws Error - Se ocorrer um erro durante a consulta
 */
export const consultarProcessos = async (params: ConsultaProcesso): Promise<Processo[]> => {
  try {
    const response = await apiClient.get<Processo[]>('/processos/buscar', {
      params: {
        termo: params.termo,
        tipo: params.tipo,
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.error('Erro ao consultar processos:', error);
    let mensagem = 'Erro ao realizar consulta de processos.';
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
 * Obtém os detalhes de um processo específico.
 * @param numeroProcesso - Número do processo
 * @returns Promise<Processo> - Detalhes do processo
 * @throws Error - Se ocorrer um erro ao buscar os detalhes
 */
export const obterDetalhesProcesso = async (numeroProcesso: string): Promise<Processo> => {
  try {
    const response = await apiClient.get<Processo>(`/processos/buscar/${numeroProcesso}`);
    return response.data;
  } catch (error: unknown) {
    console.error('Erro ao obter detalhes do processo:', error);
    let mensagem = 'Erro ao buscar detalhes do processo.';
    if (error instanceof AxiosError && error.response?.data) {
      const apiError = error.response.data as ApiErrorResponse;
      if (apiError.message) {
        mensagem = apiError.message;
      }
    }
    throw new Error(mensagem);
  }
};