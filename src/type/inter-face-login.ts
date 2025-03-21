export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null; // Usuário autenticado ou null
  isLoading: boolean; // Indica se o processo de autenticação está em andamento
  error: string | null; // Mensagem de erro, se houver
  login: (credentials: LoginCredentials) => Promise<void>; // Função de login
  logout: () => void; // Função de logout
}
