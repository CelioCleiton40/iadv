import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import DOMPurify from "dompurify"; // Biblioteca para sanitização contra XSS

// Função para simular busca no banco de dados (substituir por consulta real)
async function findUserByEmail(email: string) {
  const mockUsers = [
    {
      id: "1",
      email: "test@example.com",
      password: await bcrypt.hash("12345678", 10), // Senha mockada (criptografada)
      name: "Test User",
    },
  ];

  return mockUsers.find((user) => user.email === email);
}

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

        // Sanitização das entradas para evitar XSS
        const sanitizedEmail = DOMPurify.sanitize(credentials.email.trim().toLowerCase());
        const sanitizedPassword = DOMPurify.sanitize(credentials.password);

        // Busca o usuário no banco de dados (mock ou real)
        const user = await findUserByEmail(sanitizedEmail);

        if (!user) {
          throw new Error("Usuário não encontrado.");
        }

        // Compara a senha fornecida com a senha armazenada
        const isValid = await bcrypt.compare(sanitizedPassword, user.password);

        if (!isValid) {
          throw new Error("Credenciais inválidas.");
        }

        // Retorna os dados do usuário autenticado
        return {
          id: user.id,
          email: user.email,
          name: user.name,
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
        token.id = user.id; // Adiciona o ID do usuário ao token
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id, // Adiciona o ID do usuário à sessão
          },
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Chave secreta para assinar tokens JWT
};