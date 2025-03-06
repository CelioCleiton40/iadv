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
}

export const useRecursoStore = create<RecursoStore>((set) => ({
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
    handleInputChange: (field, value) => set(state => ({
        formData: {
            ...state.formData,
            [field]: value
        }
    })),
    handleRazaoChange: (index, field, value) => set(state => {
        const newRazoes = [...state.formData.razoes];
        newRazoes[index] = { ...newRazoes[index], [field]: value };
        return {
            formData: {
                ...state.formData,
                razoes: newRazoes
            }
        };
    }),
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
}));