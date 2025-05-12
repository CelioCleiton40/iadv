import { create } from "zustand";
import { perfilSchema } from "@/type/inter-face-perfil";
import { ZodError, z } from "zod";
import {
  getPerfil,
  updatePerfil,
  deletePerfilCompleto,
  changePassword, // Agora importado
} from "@/services/perfil.service";

type Perfil = z.infer<typeof perfilSchema>;

const INITIAL_STATE: Perfil = {
  nome: "",
  cpf: "",
  email: "",
  telefone: "",
  dataNascimento: "",
  estadoCivil: "",
  oab: "",
  estado: "",
  especialidade: "",
  escritorio: "",
  dataInscricaoOAB: "",
  situacao: "",
};

const INITIAL_PASSWORD_STATE = {
  data: {
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  },
  errors: {} as Record<string, string>,
  loading: false,
};

interface PerfilSenhaState {
  data: {
    senhaAtual: string;
    novaSenha: string;
    confirmarSenha: string;
  };
  errors: Record<string, string>;
  loading: boolean;
}

interface PerfilStore {
  perfil: {
    data: Perfil;
    errors: Record<string, string>;
    loading: boolean;
  };
  perfilSenha: PerfilSenhaState;

  fetchPerfil: () => Promise<void>;
  updateField: <K extends keyof Perfil>(field: K, value: Perfil[K]) => void;
  validateAndSave: () => Promise<boolean>;
  updatePerfilSenha: (field: keyof PerfilSenhaState["data"], value: string) => void;
  validateAndSaveSenha: () => Promise<boolean>;
  deletePerfil: () => Promise<boolean>;
}

export const usePerfilStore = create<PerfilStore>((set, get) => ({
  perfil: {
    data: { ...INITIAL_STATE },
    errors: {},
    loading: false,
  },

  perfilSenha: { ...INITIAL_PASSWORD_STATE },

  fetchPerfil: async () => {
    set((state) => ({ perfil: { ...state.perfil, loading: true } }));
    try {
      const data = await getPerfil();
      set((state) => ({
        perfil: {
          ...state.perfil,
          data,
          loading: false,
        },
      }));
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      set((state) => ({ perfil: { ...state.perfil, loading: false } }));
    }
  },

  updateField: (field, value) =>
    set((state) => ({
      perfil: {
        ...state.perfil,
        data: { ...state.perfil.data, [field]: value },
      },
    })),

  validateAndSave: async () => {
    try {
      const data = get().perfil.data;
      await perfilSchema.parseAsync(data);

      set((state) => ({ perfil: { ...state.perfil, loading: true } }));
      await updatePerfil(data);

      set((state) => ({
        perfil: {
          ...state.perfil,
          errors: {},
          loading: false,
        },
      }));

      console.log("Perfil atualizado com sucesso.");
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0];
          if (typeof field === "string") {
            errors[field] = err.message;
          }
        });

        set((state) => ({
          perfil: { ...state.perfil, errors, loading: false },
        }));
      } else {
        console.error("Erro ao salvar perfil:", error);
        set((state) => ({ perfil: { ...state.perfil, loading: false } }));
      }

      return false;
    }
  },

  updatePerfilSenha: (field, value) =>
    set((state) => ({
      perfilSenha: {
        ...state.perfilSenha,
        data: {
          ...state.perfilSenha.data,
          [field]: value,
        },
      },
    })),

  validateAndSaveSenha: async () => {
    try {
      const { senhaAtual, novaSenha, confirmarSenha } = get().perfilSenha.data;

      const errors: Record<string, string> = {};
      if (!senhaAtual) errors.senhaAtual = "Campo obrigatório";
      if (!novaSenha) errors.novaSenha = "Campo obrigatório";
      if (!confirmarSenha) errors.confirmarSenha = "Campo obrigatório";

      if (Object.keys(errors).length > 0) {
        set((state) => ({
          perfilSenha: {
            ...state.perfilSenha,
            errors,
          },
        }));
        return false;
      }

      if (novaSenha !== confirmarSenha) {
        set((state) => ({
          perfilSenha: {
            ...state.perfilSenha,
            errors: {
              confirmarSenha: "As senhas não coincidem",
            },
          },
        }));
        return false;
      }

      set((state) => ({ perfilSenha: { ...state.perfilSenha, loading: true } }));

      await changePassword({ senhaAtual, novaSenha });

      set(() => ({
        perfilSenha: { ...INITIAL_PASSWORD_STATE },
      }));

      console.log("Senha alterada com sucesso.");
      return true;
    } catch (error: any) {
      console.error("Erro ao alterar senha:", error);

      const mensagem = error?.response?.data?.mensagem || "Erro ao alterar senha";
      const fieldError = mensagem.includes("senha atual") ? "senhaAtual" : "novaSenha";

      set((state) => ({
        perfilSenha: {
          ...state.perfilSenha,
          errors: { [fieldError]: mensagem },
          loading: false,
        },
      }));

      return false;
    }
  },

  deletePerfil: async () => {
    set((state) => ({ perfil: { ...state.perfil, loading: true } }));
    try {
      await deletePerfilCompleto();
      set({
        perfil: {
          data: { ...INITIAL_STATE },
          errors: {},
          loading: false,
        },
      });
      console.log("Perfil excluído com sucesso.");
      return true;
    } catch (error) {
      console.error("Erro ao excluir perfil:", error);
      set((state) => ({ perfil: { ...state.perfil, loading: false } }));
      return false;
    }
  },
}));
