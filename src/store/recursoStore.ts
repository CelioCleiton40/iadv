import { create } from 'zustand';

interface Razao {
    titulo: string;
    conteudo: string;
}

interface FormDataRecurso {
    tipoRecurso: string;
    numeroProcesso: string;
    vara: string;
    tribunal: string;
    recorrente: string;
    recorrido: string;
    razoes: Razao[];
    pedidos: string;
    anexos: string[];
}

interface RecursoStore {
    formData: FormDataRecurso;
    showPreview: boolean;
    setFormData: (formData: FormDataRecurso) => void;
    setShowPreview: (show: boolean) => void;
    handleInputChange: (field: keyof FormDataRecurso, value: string) => void;
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

    setFormData: (formData) => set({ formData }),
    setShowPreview: (show) => set({ showPreview: show }),

    handleInputChange: (field, value) => {
        if (typeof value === 'string' && value.length > 255) return;
        set(state => ({
            formData: { ...state.formData, [field]: value }
        }));
    },

    handleRazaoChange: (index, field, value) => {
        if (value.length > 500) return;
        set(state => {
            const newRazoes = [...state.formData.razoes];
            newRazoes[index] = { ...newRazoes[index], [field]: value };
            return {
                formData: {
                    ...state.formData,
                    razoes: newRazoes
                }
            };
        });
    },

    addRazao: () => set(state => ({
        formData: {
            ...state.formData,
            razoes: [...state.formData.razoes, { titulo: "", conteudo: "" }]
        }
    })),

    removeRazao: (index) => set(state => ({
        formData: {
            ...state.formData,
            razoes: state.formData.razoes.filter((_, i) => i !== index)
        }
    })),

    addAnexo: (file) => {
        if (!file.endsWith('.pdf') && !file.endsWith('.docx')) {
            alert("Formato de arquivo inválido! Apenas PDFs e DOCX são permitidos.");
            return;
        }
        set(state => ({
            formData: {
                ...state.formData,
                anexos: [...state.formData.anexos, file]
            }
        }));
    },

    removeAnexo: (index) => set(state => ({
        formData: {
            ...state.formData,
            anexos: state.formData.anexos.filter((_, i) => i !== index)
        }
    })),

    validateForm: () => {
        const { numeroProcesso, vara, tribunal, recorrente, recorrido, pedidos } = get().formData;
        if (!numeroProcesso || !vara || !tribunal || !recorrente || !recorrido || !pedidos) {
            alert("Todos os campos obrigatórios devem ser preenchidos.");
            return false;
        }
        return true;
    }
}));
