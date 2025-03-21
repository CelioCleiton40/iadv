export interface Parte {
    nome: string;
    qualificacao: string;
}

export interface FormData {
    modelo: string;
    comarca: string;
    vara: string;
    partes: Parte[];
    dosFatos: string;
    doDireito: string;
    dosPedidos: string;
    valorCausa: string;

    // Campos da PARTE REQUERENTE:
    requerenteNome: string;
    requerenteNacionalidade: string;
    requerenteEstadoCivil: string;
    requerenteProfissao: string;
    requerenteFiliacao: string;
    requerenteRGNumero: string;
    requerenteRGOrgaoExpedidor: string;
    requerenteRGDataExpedicao: string;
    requerenteCPF: string;
    requerenteResidencia: string;
    requerenteCidade: string;
    requerenteCEP: string;
    requerenteTelefone: string;
    requerenteWhatsApp: string;
    requerenteEmail: string;

}

export interface PeticaoTemplates {
    cobranca: {
        titulo: string;
        dosFatos: string;
        doDireito: string;
        dosPedidos: string;
    };
    indenizacao: {
        titulo: string;
        dosFatos: string;
        doDireito: string;
        dosPedidos: string;
    };
    obrigacao: {
        titulo: string;
        dosFatos: string;
        doDireito: string;
        dosPedidos: string;
    };
    despejo: {
        titulo: string;
        dosFatos: string;
        doDireito: string;
        dosPedidos: string;
    };
    juizadoEspecialCivel: { // Novo modelo adicionado aqui
        titulo: string;
        dosFatos: string;
        doDireito: string;
        dosPedidos: string;
    };
}

export interface PeticaoStore {
    formData: FormData;
    showPreview: boolean;
    errors: Partial<Record<keyof FormData, string>>;
    setFormData: (data: Partial<FormData>) => void;
    setShowPreview: (show: boolean) => void;
    handleInputChange: <T extends keyof FormData>(field: T, value: FormData[T]) => void;
    handleParteChange: (index: number, field: keyof Parte, value: string) => void;
    addParte: () => void;
    removeParte: (index: number) => void;
    handleTemplateChange: (templateId: string) => void;
    handleSaveDraft: () => void;
    validateForm: () => boolean;
}