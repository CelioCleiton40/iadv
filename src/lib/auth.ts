import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs";


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
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // TODO: Replace with actual user lookup from database
        const mockUser = {
          id: '1',
          email: 'test@example.com',
          password: 'hashedPassword',
          name: 'Test User'
        };

        try {
          const isValid = await compare(credentials.password, mockUser.password);

          if (!isValid) {
            return null;
          }

          return {
            id: mockUser.id,
            email: mockUser.email,
            name: mockUser.name
          };
          
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Adicionar claims personalizadas ao token
      return token
    },
    async session({ session, token }) {
      // Personalizar dados da sessão
      return session
    }
  }
}