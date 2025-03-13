import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt, { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  providers: [
    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("E-mail e senha são obrigatórios.");
        }

        // Mock de usuário para testes
        const mockUser = {
          id: "1",
          email: "test@example.com",
          password: await bcrypt.hash("12345678", 10), // Senha mockada (criptografada)
          name: "Test User",
        };

        // Simula a comparação da senha (bcrypt)
        const isValid = await compare(credentials.password, mockUser.password);

        if (!isValid) {
          throw new Error("Credenciais inválidas.");
        }

        return {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; 
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id, 
          },
        };
      }
      return session;
    },
  },
};
