import { create } from 'zustand';
import { z } from 'zod';

// Schema de validação usando Zod
const razaoSchema = z.object({
    titulo: z.string().min(3, "O título deve ter pelo menos 3 caracteres.").max(100, "O título é muito longo."),
    conteudo: z.string().min(10, "A razão deve ter pelo menos 10 caracteres.").max(500, "A razão é muito longa."),
});

const formDataSchema = z.object({
    tipoRecurso: z.enum(["apelacao", "agravo", "embargos"], { message: "Tipo de recurso inválido." }),
    numeroProcesso: z.string().min(5, "Número do processo inválido."),
    vara: z.string().min(3, "Vara inválida."),
    tribunal: z.string().min(3, "Tribunal inválido."),
    recorrente: z.string().min(3, "Nome do recorrente inválido."),
    recorrido: z.string().min(3, "Nome do recorrido inválido."),
    razoes: z.array(razaoSchema),
    pedidos: z.string().min(10, "Os pedidos devem ter pelo menos 10 caracteres."),
    anexos: z.array(
        z.string().refine((file) => file.endsWith('.pdf') || file.endsWith('.docx'), {
            message: "Formato de arquivo inválido! Apenas PDFs e DOCX são permitidos.",
        })
    ).max(5, "No máximo 5 anexos são permitidos."),
});

interface Razao {
    titulo: string;
    conteudo: string;
}

interface FormDataRecurso extends z.infer<typeof formDataSchema> {}

interface RecursoStore {
    formData: FormDataRecurso;
    showPreview: boolean;
    errors: Partial<Record<keyof FormDataRecurso, string>>;
    setFormData: (data: Partial<FormDataRecurso>) => void;
    setShowPreview: (show: boolean) => void;
    handleInputChange: <T extends keyof FormDataRecurso>(field: T, value: FormDataRecurso[T]) => void;
    handleRazaoChange: (index: number, field: keyof Razao, value: string) => void;
    addRazao: () => void;
    removeRazao: (index: number) => void;
    validateForm: () => boolean;
    addAnexo: (file: string) => void;
    removeAnexo: (index: number) => void;
}

export const useRecursoStore = create<RecursoStore>((set, get) => ({
    formData: {
        tipoRecurso: "apelacao",
        numeroProcesso: "",
        vara: "",
        tribunal: "",
        recorrente: "",
        recorrido: "",
        razoes: [{ titulo: "", conteudo: "" }],
        pedidos: "",
        anexos: [],
    },
    showPreview: false,
    errors: {},

    setFormData: (data) => {
        const parsed = formDataSchema.partial().safeParse({ ...get().formData, ...data });
        if (parsed.success) {
            set({ formData: { ...get().formData, ...parsed.data as FormDataRecurso }, errors: {} });
        } else {
            const formattedErrors = Object.fromEntries(
                parsed.error.errors.map((err) => [err.path.join('.'), err.message])
            );
            set({ errors: formattedErrors });
        }
    },

    setShowPreview: (show) => set({ showPreview: show }),

    handleInputChange: (field: keyof FormDataRecurso, value: unknown) => {
        if (!(field in formDataSchema.shape)) {
            console.error(`Campo inválido: ${field}`);
            return;
        }
    
        const parsed = formDataSchema.shape[field]?.safeParse(value);
    
        if (parsed?.success) {
            set((state) => ({
                formData: { ...state.formData, [field]: value },
                errors: { ...state.errors, [field]: undefined },
            }));
        } else {
            const errorMessage = parsed?.error?.errors?.[0]?.message || "Valor inválido.";
            set((state) => ({ 
                errors: { ...state.errors, [field]: errorMessage } 
            }));
        }
    },
    

    handleRazaoChange: (index, field, value) => {
        const newRazoes = [...get().formData.razoes];
        newRazoes[index] = { ...newRazoes[index], [field]: value };

        const parsed = razaoSchema.safeParse(newRazoes[index]);
        if (!parsed.success) {
            const errorMessage = parsed.error.errors[0].message;
            set((state) => ({ errors: { ...state.errors, [`razoes.${index}.${field}`]: errorMessage } }));
        } else {
            set((state) => ({
                formData: { ...state.formData, razoes: newRazoes },
                errors: { ...state.errors, [`razoes.${index}.${field}`]: undefined },
            }));
        }
    },

    addRazao: () =>
        set((state) => ({
            formData: {
                ...state.formData,
                razoes: [...state.formData.razoes, { titulo: "", conteudo: "" }],
            },
        })),

    removeRazao: (index) =>
        set((state) => ({
            formData: {
                ...state.formData,
                razoes: state.formData.razoes.filter((_, i) => i !== index),
            },
        })),

    addAnexo: (file) => {
        const parsed = formDataSchema.pick({ anexos: true }).safeParse({ anexos: [file] });
        if (parsed.success) {
            set((state) => ({
                formData: { ...state.formData, anexos: [...state.formData.anexos, file] },
            }));
        } else {
            const errorMessage = parsed.error.errors[0].message;
            set((state) => ({ errors: { ...state.errors, anexos: errorMessage } }));
        }
    },

    removeAnexo: (index) =>
        set((state) => ({
            formData: {
                ...state.formData,
                anexos: state.formData.anexos.filter((_, i) => i !== index),
            },
        })),

    validateForm: () => {
        const result = formDataSchema.safeParse(get().formData);
        if (!result.success) {
            const formattedErrors = Object.fromEntries(
                result.error.errors.map((err) => [err.path.join('.'), err.message])
            );
            set({ errors: formattedErrors });
            return false;
        }
        return true;
    },
}));