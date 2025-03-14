"use client"

import { create } from "zustand";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RegisterUser, RegisterState } from "@/type/inter-face-register";

const SECRET_KEY = "minha-chave-secreta"; // Alterar para uma chave segura

// Simulando um banco de dados (substituir por API real)
const usersDB: { firstName: string; lastName: string; email: string; passwordHash: string }[] = [];

// Função para gerar token JWT
const generateToken = (email: string) => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
};

export const registerStore = create<RegisterState & {
  user: { firstName: string; lastName: string; email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
  setUser: (user: { firstName: string; lastName: string; email: string } | null) => void;
}>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  // Função de Registro
  register: async (user: RegisterUser) => {
    const userExists = usersDB.find((u) => u.email === user.email);
    if (userExists) {
      return "E-mail já cadastrado!";
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(user.password, salt);

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
    const user = usersDB.find((u) => u.email === email);
    if (!user) {
      return "E-mail não cadastrado!";
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return "Senha incorreta!";
    }

    const token = generateToken(user.email);

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

  // Função para setar usuário manualmente
  setUser: (user) => set({ user }),
}));
