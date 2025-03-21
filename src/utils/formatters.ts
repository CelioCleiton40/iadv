"use client";


export const formatCurrency = (value: number | string | undefined | null): string => {
    if (value === undefined || value === null || value === '') {
        return ''; // Retorna string vazia para valores nulos ou indefinidos
    }

    try {
        let num: number;

        if (typeof value === 'string') {
            const parsed = parseCurrencyInput(value);
            if (parsed === undefined) {
                throw new Error('Valor inválido fornecido para formatação.');
            }
            num = parsed;
        } else {
            num = value;
        }

        // Garante que o número seja válido
        if (isNaN(num)) {
            throw new Error('O valor fornecido não é um número válido.');
        }

        // Formata o número como moeda BRL
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(num);
    } catch (error) {
        console.error('Erro ao formatar moeda:', error);
        return ''; // Retorna string vazia em caso de erro
    }
};

export const parseCurrencyInput = (value: string): number | undefined => {
    if (!value) return undefined;

    try {
        // Remove todos os caracteres que não são números, vírgulas ou pontos
        let cleanedValue = value.replace(/[^0-9,.-]/g, '');

        // Substitui vírgulas por pontos para garantir consistência
        cleanedValue = cleanedValue.replace(/,/g, '.');

        // Garante que só há um ponto decimal
        const parts = cleanedValue.split('.');
        if (parts.length > 2) {
            throw new Error('Formato inválido: múltiplos pontos decimais encontrados.');
        }

        // Converte para número
        const parsed = Number(cleanedValue);
        if (isNaN(parsed)) {
            throw new Error('O valor fornecido não pode ser convertido para número.');
        }

        return parsed;
    } catch (error) {
        console.error('Erro ao converter entrada para número:', error);
        return undefined; // Retorna undefined em caso de erro
    }
};