// Tipo para representar os dados de um usuário em processo de registro
export type RegisterUser = {
  firstName: string; // Nome do usuário
  lastName: string; // Sobrenome do usuário
  email: string; // E-mail do usuário
  password: string; // Senha do usuário
};

// Tipo para representar o estado de registro
export type RegisterState = {
  register: (user: RegisterUser) => Promise<{ success: boolean; message: string | null }>; // Função de registro
  loading: boolean; // Indica se o registro está em andamento
  error: string | null; // Mensagem de erro, se houver
};

// Função de exemplo para validar os dados de registro
export const validateRegisterUser = (user: RegisterUser): string | null => {
  if (!user.firstName.trim()) return "O nome é obrigatório.";
  if (!user.lastName.trim()) return "O sobrenome é obrigatório.";
  if (!user.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      return "O e-mail fornecido é inválido.";
  }
  if (user.password.length < 8) {
      return "A senha deve ter pelo menos 8 caracteres.";
  }
  return null; // Retorna null se os dados forem válidos
};

// Função de exemplo para simular o registro
export const registerUser = async (user: RegisterUser): Promise<{ success: boolean; message: string | null }> => {
  try {
      const validationError = validateRegisterUser(user);
      if (validationError) {
          return { success: false, message: validationError }; // Retorna mensagem de erro se a validação falhar
      }

      // Simulação de chamada API para registro
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula delay

      // Aqui você pode adicionar lógica real de registro (e.g., chamada HTTP)
      console.log("Usuário registrado:", user);

      return { success: true, message: "Registro realizado com sucesso!" };
  } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      return { success: false, message: "Ocorreu um erro durante o registro. Por favor, tente novamente." };
  }
};