import { create } from 'zustand';


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

const initialFormState: FormData = {
    modelo: "",
    comarca: "",
    vara: "",
    partes: [{ nome: "", qualificacao: "" }],
    dosFatos: "",
    doDireito: "",
    dosPedidos: "",
    valorCausa: "",

    // Inicializando os campos da PARTE REQUERENTE:
    requerenteNome: '',
    requerenteNacionalidade: '',
    requerenteEstadoCivil: '',
    requerenteProfissao: '',
    requerenteFiliacao: '',
    requerenteRGNumero: '',
    requerenteRGOrgaoExpedidor: '',
    requerenteRGDataExpedicao: '',
    requerenteCPF: '',
    requerenteResidencia: '',
    requerenteCidade: '',
    requerenteCEP: '',
    requerenteTelefone: '',
    requerenteWhatsApp: '',
    requerenteEmail: '',
};


interface PeticaoTemplates {
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

const parteRequerenteInfo = `PARTE REQUERENTE: ${initialFormState.requerenteNome}, nacionalidade: ${initialFormState.requerenteNacionalidade}, estado civil: ${initialFormState.requerenteEstadoCivil}, profissão: ${initialFormState.requerenteProfissao}, filiação: ${initialFormState.requerenteFiliacao}, portador da Carteira de Identidade nº: ${initialFormState.requerenteRGNumero}, órgão expedidor/UF: ${initialFormState.requerenteRGOrgaoExpedidor}, data da expedição: ${initialFormState.requerenteRGDataExpedicao}, inscrito no CPF sob o nº: ${initialFormState.requerenteCPF}, residente e domiciliado na ${initialFormState.requerenteResidencia}, Cidade: ${initialFormState.requerenteCidade}, CEP: ${initialFormState.requerenteCEP}, telefone(s): ${initialFormState.requerenteTelefone}, WhatsApp: ${initialFormState.requerenteWhatsApp}, e-mail: ${initialFormState.requerenteEmail}, vem, à presença de Vossa Excelência, propor a presente  \n\n`;


const peticaoTemplates: PeticaoTemplates = {
    cobranca: {
        titulo: "AÇÃO DE COBRANÇA",
        dosFatos: `${parteRequerenteInfo}O(A) autor(a) é credor(a) do(a) réu(a) da importância de [VALOR], representada por [DOCUMENTO], vencida em [DATA].\n\nApesar das diversas tentativas de recebimento amigável, o(a) réu(a) permanece inadimplente.`,
        doDireito:
            "O Código Civil estabelece em seu art. 397 que o inadimplemento da obrigação, positiva e líquida, no seu termo, constitui de pleno direito em mora o devedor.\n\nAinda, o art. 398 do mesmo diploma legal dispõe que nas obrigações provenientes de ato ilícito, considera-se o devedor em mora, desde que o praticou.",
        dosPedidos:
            "Ante o exposto, requer a Vossa Excelência:\n\na) A citação do(a) réu(a) para, querendo, contestar a presente ação;\n\nb) A procedência da ação, condenando o(a) réu(a) ao pagamento da quantia de [VALOR], acrescida de juros legais e correção monetária;\n\nc) A condenação do(a) réu(a) ao pagamento das custas processuais e honorários advocatícios.",
    },
    indenizacao: {
        titulo: "AÇÃO DE INDENIZAÇÃO POR DANOS MORAIS E MATERIAIS",
        dosFatos: `${parteRequerenteInfo}No dia [DATA], o(a) autor(a) sofreu [DESCREVER O DANO] causado pelo(a) réu(a), conforme [DOCUMENTOS/PROVAS].\n\nEm decorrência do ocorrido, o(a) autor(a) sofreu os seguintes prejuízos: [LISTAR PREJUÍZOS].`,
        doDireito:
            "O art. 186 do Código Civil estabelece que aquele que, por ação ou omissão voluntária, negligência ou imprudência, violar direito e causar dano a outrem, ainda que exclusivamente moral, comete ato ilícito.\n\nO art. 927 do mesmo diploma legal complementa que aquele que, por ato ilícito, causar dano a outrem, fica obrigado a repará-lo.",
        dosPedidos:
            "Ante o exposto, requer a Vossa Excelência:\n\na) A citação do(a) réu(a) para, querendo, contestar a presente ação;\n\nb) A procedência da ação, condenando o(a) réu(a) ao pagamento de indenização por danos materiais no valor de [VALOR];\n\nc) A condenação do(a) réu(a) ao pagamento de indenização por danos morais em valor a ser arbitrado por Vossa Excelência;\n\nd) A condenação do(a) réu(a) ao pagamento das custas processuais e honorários advocatícios.",
    },
    obrigacao: {
        titulo: "AÇÃO DE OBRIGAÇÃO DE FAZER",
        dosFatos: `${parteRequerenteInfo}O(A) autor(a) e o(a) réu(a) celebraram contrato em [DATA], pelo qual o(a) réu(a) se comprometeu a [DESCREVER OBRIGAÇÃO].\n\nNo entanto, apesar das notificações enviadas, o(a) réu(a) não cumpriu com sua obrigação contratual.`,
        doDireito:
            "O art. 422 do Código Civil estabelece que os contratantes são obrigados a guardar, assim na conclusão do contrato, como em sua execução, os princípios de probidade e boa-fé.\n\nO art. 475 do mesmo diploma legal dispõe que a parte lesada pelo inadimplemento pode pedir a resolução do contrato, se não preferir exigir-lhe o cumprimento.",
        dosPedidos:
            "Ante o exposto, requer a Vossa Excelência:\n\na) A citação do(a) réu(a) para, querendo, contestar a presente ação;\n\nb) A concessão de tutela de urgência para determinar que o(a) réu(a) cumpra imediatamente a obrigação de [DESCREVER OBRIGAÇÃO], sob pena de multa diária;\n\nc) A procedência da ação, confirmando a tutela de urgência;\n\nd) A condenação do(a) réu(a) ao pagamento das custas processuais e honorários advocatícios.",
    },
    despejo: {
        titulo: "AÇÃO DE DESPEJO POR FALTA DE PAGAMENTO",
        dosFatos: `${parteRequerenteInfo}O(A) autor(a) é proprietário(a) do imóvel situado à [ENDEREÇO], o qual foi locado ao(à) réu(a) mediante contrato firmado em [DATA].\n\nO(A) réu(a) está inadimplente com os aluguéis desde [MÊS/ANO], totalizando [VALOR] até a presente data.`,
        doDireito:
            "A Lei nº 8.245/91 (Lei do Inquilinato) estabelece em seu art. 9º, inciso III, que a locação pode ser desfeita por falta de pagamento do aluguel e demais encargos.\n\nO art. 62 da mesma lei dispõe sobre o procedimento da ação de despejo por falta de pagamento.",
        dosPedidos:
            "Ante o exposto, requer a Vossa Excelência:\n\na) A citação do(a) réu(a) para, querendo, purgar a mora ou contestar a presente ação;\n\nb) A procedência da ação, decretando o despejo do(a) réu(a);\n\nc) A condenação do(a) réu(a) ao pagamento dos aluguéis em atraso, no valor de [VALOR], acrescido dos que se vencerem no curso da ação;\n\nd) A condenação do(a) réu(a) ao pagamento das custas processuais e honorários advocatícios.",
    },
    juizadoEspecialCivel: { // Modelo "Juizado Especial Cível"
        titulo: "PETIÇÃO INICIAL AO JUIZADO ESPECIAL CÍVEL",
        dosFatos: `${parteRequerenteInfo}AO JUIZADO ESPECIAL CÍVEL DE (a) <DIGITE O NOME DA CIDADE {FÓRUM}>-\n{ESTADO}.\n\nPRIORIDADE NA TRAMITAÇÃO\n\n(Se for o caso, marque X sua condição)\n\n(  ) IDOSO (=+ 60 anos)\n\n(  ) IDOSO (+ 80 anos)\n\n(  ) Pessoa com Deficiência\n\n(  ) Pessoa com Doença grave\n\n* Juntar documento que comprove a condição.\n\nOPÇÕES DE ATENDIMENTO DIGITAL\n\n(  ) Eu quero aderir ao juízo 100% digital, e estou ciente dos termos e condições da Portaria Conjunta 29/2021.\n\n(  ) Eu aceito receber intimações pelo WhatsApp no número indicado nesta petição, e estou ciente dos termos e condições da Portaria Conjunta 67/2016.\n\nEm <digitar data do evento/contrato/etc>, a parte requerente informa que <digite em resumo o que aconteceu de forma simples, lógica e sempre em ordem cronológica, citando registros como nº contrato, protocolos, BO, sempre que possível indicando 'conforme documentos em anexo'. Pode utilizar mais de um parágrafo.>\n\nPor restar infrutífero qualquer acordo amigável, propõe a parte requerente a presente ação.`,
        doDireito: "Não especificado", // Seção "Do Direito" não fornecida no modelo, pode ser preenchida ou deixada para o usuário
        dosPedidos:
            "Com base no exposto, requer:\n\na) que a parte requerida seja citada da presente ação e intimada para comparecer pessoalmente à Audiência de Conciliação, a ser designada no ato da distribuição, sendo que o não comparecimento importará a pena de revelia;\n\nb) No mérito, que seja julgado procedente o pedido para condenar a parte requerida <digite o seu pedido de acordo com o relato no resumo, tipo PAGAR a quantia de R$; OBRIGAÇÃO DE FAZER para .....; etc. Caso tenha mais de um pedido, pode acrescentar outro item, tipo c)>.",
    },
};



interface PeticaoStore {
    formData: FormData;
    showPreview: boolean;
    peticaoTemplates: PeticaoTemplates;

    setFormData: (data: FormData) => void;
    setShowPreview: (show: boolean) => void;
    handleInputChange: <T extends keyof FormData>(field: T, value: FormData[T]) => void;
    handleParteChange: (index: number, field: keyof Parte, value: string) => void;
    addParte: () => void;
    removeParte: (index: number) => void;
    handleTemplateChange: (templateId: keyof PeticaoTemplates) => void;
    handleSaveDraft: () => void;
}


export const usePeticaoStore = create<PeticaoStore>((set) => ({
    formData: initialFormState,
    showPreview: false,
    peticaoTemplates: peticaoTemplates,

    setFormData: (data) => set({ formData: data }),
    setShowPreview: (show) => set({ showPreview: show }),

    handleInputChange: (field, value) =>
        set((state) => ({
            formData: { ...state.formData, [field]: value },
        })) as any,

    handleParteChange: (index, field, value) =>
        set((state) => {
            const newPartes: Parte[] = [...state.formData.partes]; 
            newPartes[index] = { ...newPartes[index], [field]: value };
            return {
                formData: { ...state.formData, partes: newPartes },
            };
        }),

    addParte: () =>
        set((state) => ({
            formData: {
                ...state.formData,
                partes: [...state.formData.partes, { nome: "", qualificacao: "" }],
            },
        })),

    removeParte: (index) =>
        set((state) => ({
            formData: {
                ...state.formData,
                partes: state.formData.partes.filter((_, i) => i !== index),
            },
        })),
    handleTemplateChange: (templateId) => {
        const template = peticaoTemplates[templateId];
        if (template) {
            set((state) => ({
                formData: {
                    ...state.formData,
                    modelo: template.titulo,
                    dosFatos: template.dosFatos,
                    doDireito: template.doDireito,
                    dosPedidos: template.dosPedidos,
                },
            }));
        }
    },
    handleSaveDraft: () => {
        set((state) => {
            localStorage.setItem("peticaoInicial", JSON.stringify(state.formData));
            alert("Rascunho salvo com sucesso!");
            return { formData: initialFormState };
        });
    },
}));