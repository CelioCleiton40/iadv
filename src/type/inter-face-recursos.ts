export interface Razao {
    titulo: string;
    conteudo: string;
  }
  
  export interface FormData {
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
  
  export interface RecursoPreviewProps {
    formData: FormData;
    showPreview: boolean;
    setShowPreview: (show: boolean) => void;
    handleSaveDraft: () => void;
  }
  