import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Simulando um hash de senha armazenado (em produção, isso viria do banco de dados)
    const hashedPassword = "$2b$10$YourHashedPasswordHere";

    // Verificando se o email existe
    if (email === "teste@exemplo.com") {
      // Comparando a senha fornecida com o hash
      const isValidPassword = await compare(password, hashedPassword);

      if (isValidPassword) {
        const token = jwt.sign(
          { email, userId: "123" },
          process.env.JWT_SECRET || "sua-chave-secreta",
          { expiresIn: "24h" }
        );

        return NextResponse.json({
          token,
          user: {
            email,
            name: "Usuário Teste",
          },
        });
      }
    }

    return NextResponse.json(
      { message: "Credenciais inválidas" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}