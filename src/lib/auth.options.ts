import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email", placeholder: "seu@email.com" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("E-mail e senha são obrigatórios.");
        }

        try {
          // Enviando dados de login para o backend
          const response = await fetch("http://localhost:3001/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const user = await response.json();

          // Se a resposta for falha (erro do backend)
          if (!response.ok) {
            throw new Error(user.message || "Credenciais inválidas.");
          }

          // Retorna o usuário obtido do backend
          return user;
        } catch (err: any) {
          console.error("Erro ao autenticar com backend:", err);
          throw new Error("Erro ao autenticar. Tente novamente.");
        }
      }
    })
  ],

  callbacks: {
    async session({ session, token }) {
      // Garantir que o objeto user existe
      const user: typeof session.user = {
        name: token.name || null,
        email: token.email || null,
        image: token.picture || null,
      };

      return {
        ...session,
        user: {
          ...session.user,
          ...user
        }
      };
    },
  },
};
