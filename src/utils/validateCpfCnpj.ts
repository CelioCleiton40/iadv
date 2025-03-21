// Função de validação adicional para CPF/CNPJ
export const validateCpfCnpj = (cpfCnpj: string): boolean => {
    if (!cpfCnpj) return false;
  
    // Remove caracteres especiais
    const cleaned = cpfCnpj.replace(/[^\d]/g, "");
  
    // Validação de CPF
    if (cleaned.length === 11) {
      let sum = 0;
      let remainder;
      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
      }
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cleaned.substring(9, 10))) return false;
  
      sum = 0;
      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
      }
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cleaned.substring(10, 11))) return false;
  
      return true;
    }
  
    // Validação de CNPJ
    if (cleaned.length === 14) {
      let size = cleaned.length - 2;
      let numbers = cleaned.substring(0, size);
      const digits = cleaned.substring(size);
      let sum = 0;
      let pos = size - 7;
  
      for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) pos = 9;
      }
  
      let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (result !== parseInt(digits.charAt(0))) return false;
  
      size += 1;
      numbers = cleaned.substring(0, size);
      sum = 0;
      pos = size - 7;
  
      for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) pos = 9;
      }
  
      result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (result !== parseInt(digits.charAt(1))) return false;
  
      return true;
    }
  
    return false;
  };