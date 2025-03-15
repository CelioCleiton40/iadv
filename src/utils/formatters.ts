"use client"

export const formatCurrency = (value: number | string | undefined | null) => {
    if (value === undefined || value === null || value === '') {
        return '';
    }
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(num);
};

export const parseCurrencyInput = (value: string): number | undefined => {
    if (!value) {
        return undefined;
    }
    const cleanedValue = value.replace(/[^\d,-]/g, '').replace(',', '.');
    const parsed = parseFloat(cleanedValue);
    return isNaN(parsed) ? undefined : parsed;
};