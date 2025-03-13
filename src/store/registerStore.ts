import { create } from "zustand";
import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "minha-chave-secreta"; // Altere para uma chave segura

// Tipagem do estado de autenticação
type AuthState = {
  user: { firstName: string; lastName: string; email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  register: (user: { firstName: string; lastName: string; email: string; password: string }) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
};

// Simulando um banco de dados (substituir por API real)
const usersDB: { firstName: string; lastName: string; email: string; passwordHash: string }[] = [];

// Função para gerar token JWT
const generateToken = (email: string) => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  // Função de Registro
  register: async (user) => {
    // Verifica se o e-mail já existe no "banco"
    const userExists = usersDB.find((u) => u.email === user.email);
    if (userExists) {
      return "E-mail já cadastrado!";
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(user.password, salt);

    // Adiciona o novo usuário ao "banco"
    usersDB.push({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      passwordHash,
    });

    return "Usuário cadastrado com sucesso!";
  },

  // Função de Login
  login: async (email, password) => {
    // Busca o usuário no "banco"
    const user = usersDB.find((u) => u.email === email);
    if (!user) {
      return "E-mail não cadastrado!";
    }

    // Verifica a senha
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return "Senha incorreta!";
    }

    // Gera token JWT
    const token = generateToken(user.email);

    // Define estado de autenticação
    set({
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email },
      token,
      isAuthenticated: true,
    });

    return "Login realizado com sucesso!";
  },

  // Função de Logout
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
