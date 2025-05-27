import { create } from 'zustand';
import { ConsultaProcesso, Processo } from '@/type/inter-face-processo';
import { consultarProcessos } from '@/services/processo.service';

interface ProcessoStore {
  consulta: {
    data: ConsultaProcesso;
    resultados: Processo[];
    loading: boolean;
    error: string | null;
  };
  updateSearchTerm: (termo: string) => void;
  updateSearchType: (tipo: ConsultaProcesso['tipo']) => void;
  realizarConsulta: () => Promise<void>;
  limparResultados: () => void;
}

const INITIAL_STATE: ConsultaProcesso = {
  termo: '',
  tipo: 'numero',
};

export const useProcessoStore = create<ProcessoStore>((set, get) => ({
  consulta: {
    data: { ...INITIAL_STATE },
    resultados: [],
    loading: false,
    error: null,
  },

  updateSearchTerm: (termo) =>
    set((state) => ({
      consulta: {
        ...state.consulta,
        data: { ...state.consulta.data, termo },
        error: null,
      },
    })),

  updateSearchType: (tipo) =>
    set((state) => ({
      consulta: {
        ...state.consulta,
        data: { ...state.consulta.data, tipo },
        error: null,
      },
    })),

  realizarConsulta: async () => {
    const { data } = get().consulta;

    if (!data.termo) {
      set((state) => ({
        consulta: {
          ...state.consulta,
          error: 'Digite um termo para pesquisa',
        },
      }));
      return;
    }

    set((state) => ({
      consulta: { ...state.consulta, loading: true, error: null },
    }));

    try {
      const resultados = await consultarProcessos(data);
      set((state) => ({
        consulta: {
          ...state.consulta,
          resultados,
          loading: false,
        },
      }));
    } catch (error) {
      set((state) => ({
        consulta: {
          ...state.consulta,
          error: error instanceof Error ? error.message : 'Erro ao realizar consulta',
          loading: false,
        },
      }));
    }
  },

  limparResultados: () =>
    set((state) => ({
      consulta: {
        ...state.consulta,
        resultados: [],
        error: null,
      },
    })),
}));