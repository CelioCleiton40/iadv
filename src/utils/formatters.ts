"use client"

export const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue) {
        const numberValue = parseInt(numericValue, 10) / 100;
        return numberValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }
    return "";
};