import { create } from 'zustand';
import { z } from 'zod';

// Definição dos schemas de validação
const cpfSchema = z.string().regex(/^\d{11}$/, "CPF inválido. Use apenas números.");
const emailSchema = z.string().trim().toLowerCase().email("E-mail inválido.");
const telefoneSchema = z.string().regex(/^\d{10,11}$/, "Telefone inválido.");
const cepSchema = z.string().regex(/^\d{8}$/, "CEP inválido.");
const argumentoSchema = z.object({
  titulo: z.string().min(3, "Título muito curto."),
  conteudo: z.string().min(10, "Conteúdo muito curto."),
});

// Validação do formulário principal
const formSchema = z.object({
  numeroProcesso: z.string().min(5, "Número do processo inválido."),
  vara: z.string().min(2, "Vara inválida."),
  comarca: z.string().min(2, "Comarca inválida."),
  autor: z.string().min(3, "Nome do autor inválido."),
  reu: z.string().min(3, "Nome do réu inválido."),
  reuNacionalidade: z.string().optional(),
  reuEstadoCivil: z.string().optional(),
  reuProfissao: z.string().optional(),
  reuFiliacao: z.string().optional(),
  reuRGNumero: z.string().optional(),
  reuRGOrgaoExpedidor: z.string().optional(),
  reuRGDataExpedicao: z.string().optional(),
  reuCPF: cpfSchema,
  reuResidencia: z.string().min(5, "Endereço inválido."),
  reuCidade: z.string().min(2, "Cidade inválida."),
  reuCEP: cepSchema,
  reuTelefone: telefoneSchema,
  reuWhatsApp: telefoneSchema.optional(),
  reuEmail: emailSchema,
  preliminar: z.string().optional(),
  fundamentacaoPreliminar: z.string().optional(),
  argumentos: z.array(argumentoSchema).optional(),
  provas: z.string().optional(),
  pedidos: z.string().optional(),
});

// Tipagem baseada no schema
export type FormDataContestacao = z.infer<typeof formSchema>;

// Store principal
export const useContestacaoStore = create<{
  formData: FormDataContestacao;
  errors: Partial<Record<keyof FormDataContestacao, string>>;
  showPreview: boolean;
  setFormData: (data: Partial<FormDataContestacao>) => void;
  setShowPreview: (show: boolean) => void;
  handleInputChange: (field: keyof FormDataContestacao, value: string) => void;
  handleArgumentoChange: (index: number, field: keyof typeof argumentoSchema._type, value: string) => void;
  addArgumento: () => void;
  removeArgumento: (index: number) => void;
}>((set, get) => ({
  formData: {
    numeroProcesso: "",
    vara: "",
    comarca: "",
    autor: "",
    reu: "",
    reuNacionalidade: "",
    reuEstadoCivil: "",
    reuProfissao: "",
    reuFiliacao: "",
    reuRGNumero: "",
    reuRGOrgaoExpedidor: "",
    reuRGDataExpedicao: "",
    reuCPF: "",
    reuResidencia: "",
    reuCidade: "",
    reuCEP: "",
    reuTelefone: "",
    reuWhatsApp: "",
    reuEmail: "",
    preliminar: "",
    fundamentacaoPreliminar: "",
    argumentos: [{ titulo: "", conteudo: "" }],
    provas: "",
    pedidos: "",
  },
  errors: {},
  showPreview: false,

  // Atualiza todo o formulário validando antes
  setFormData: (data) => {
    const parsed = formSchema.safeParse({ ...get().formData, ...data });
    if (parsed.success) {
      set({ formData: parsed.data, errors: {} });
    } else {
      const formattedErrors = parsed.error.format();
      const errorMessages = Object.fromEntries(
        Object.entries(formattedErrors).filter(([key]) => key !== '_errors').map(([field, error]) => [field, (error as any)?._errors?.[0]])
      );
      set({ errors: errorMessages });
      console.error("Erro de validação:", formattedErrors);
    }
  },

  setShowPreview: (show) => set({ showPreview: show }),

  // Atualiza campo específico validando antes
  handleInputChange: (field, value) => {
    const updatedData = { ...get().formData, [field]: value };
    const parsed = formSchema.partial().safeParse(updatedData);
    if (parsed.success) {
      set({ formData: updatedData, errors: { ...get().errors, [field]: undefined } });
    } else {
      const errorMessages = parsed.error.format()[field]?._errors?.[0];
      set({ errors: { ...get().errors, [field]: errorMessages } });
      console.error(`Erro no campo ${field}:`, parsed.error.format());
    }
  },

  // Atualiza argumentos validando antes
  handleArgumentoChange: (index, field, value) => {
    set((state) => {
      const newArgumentos = [...(state.formData.argumentos || [])];
      newArgumentos[index] = { ...newArgumentos[index], [field]: value };
      const parsed = argumentoSchema.safeParse(newArgumentos[index]);
      if (!parsed.success) {
        console.error("Erro no argumento:", parsed.error.format());
      }
      return {
        formData: { ...state.formData, argumentos: newArgumentos },
      };
    });
  },

  addArgumento: () =>
    set((state) => ({
      formData: {
        ...state.formData,
        argumentos: [...(state.formData.argumentos || []), { titulo: "", conteudo: "" }],
      },
    })),

  removeArgumento: (index) =>
    set((state) => ({
      formData: {
        ...state.formData,
        argumentos: (state.formData.argumentos || []).filter((_, i) => i !== index),
      },
    })),
}));