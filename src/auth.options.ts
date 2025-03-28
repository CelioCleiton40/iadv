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

        // Simulação de um usuário válido (substitua por lógica real de autenticação)
        const user = { id: "1", name: "Usuário Teste", email: credentials.email };

        if (credentials.password !== "12345678") {
          throw new Error("Credenciais inválidas.");
        }

        return user;
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
