import { create } from 'zustand';

export interface Argumento {
    titulo: string;
    conteudo: string;
}

export interface FormDataContestacao {
    numeroProcesso: string;
    vara: string;
    comarca: string;
    autor: string;
    reu: string;
    reuNacionalidade: string;
    reuEstadoCivil: string;
    reuProfissao: string;
    reuFiliacao: string;
    reuRGNumero: string;
    reuRGOrgaoExpedidor: string;
    reuRGDataExpedicao: string;
    reuCPF: string;
    reuResidencia: string;
    reuCidade: string;
    reuCEP: string;
    reuTelefone: string;
    reuWhatsApp: string;
    reuEmail: string;
    preliminar: string;
    fundamentacaoPreliminar: string;
    argumentos: Argumento[];
    provas: string;
    pedidos: string;
}

export interface ContestacaoStore {
    formData: FormDataContestacao;
    showPreview: boolean;
    setFormData: (formData: FormDataContestacao) => void;
    setShowPreview: (show: boolean) => void;
    handleInputChange: (field: keyof FormDataContestacao, value: string) => void;
    handleArgumentoChange: (index: number, field: keyof Argumento, value: string) => void;
    addArgumento: () => void;
    removeArgumento: (index: number) => void;
}

export const useContestacaoStore = create<ContestacaoStore>((set) => ({
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
    showPreview: false,
    setFormData: (formData) => set({ formData }),
    setShowPreview: (show) => set({ showPreview: show }),
    handleInputChange: (field, value) => set(state => ({
        formData: {
            ...state.formData,
            [field]: value
        }
    })),
    handleArgumentoChange: (index, field, value) => set(state => {
        const newArgumentos = [...state.formData.argumentos];
        newArgumentos[index] = { ...newArgumentos[index], [field]: value };
        return {
            formData: {
                ...state.formData,
                argumentos: newArgumentos
            }
        };
    }),
    addArgumento: () => set(state => ({
        formData: {
            ...state.formData,
            argumentos: [...state.formData.argumentos, { titulo: "", conteudo: "" }]
        }
    })),
    removeArgumento: (index) => set(state => ({
        formData: {
            ...state.formData,
            argumentos: state.formData.argumentos.filter((_, i) => i !== index)
        }
    })),
}));