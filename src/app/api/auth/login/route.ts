import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import DOMPurify from "dompurify";

export async function POST(req: Request) {
  try {
    // 1. Sanitização das entradas
    const body = await req.json();
    const email = DOMPurify.sanitize(body.email?.trim() || "");
    const password = DOMPurify.sanitize(body.password?.trim() || "");

    // 2. Validação básica dos campos
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Simulando um hash de senha armazenado (em produção, isso viria do banco de dados)
    const hashedPassword = "$2b$10$YourHashedPasswordHere";

    // 3. Verificando se o email existe (em produção, consulte o banco de dados)
    if (email !== "teste@exemplo.com") {
      return NextResponse.json(
        { message: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // 4. Comparando a senha fornecida com o hash
    const isValidPassword = await compare(password, hashedPassword);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // 5. Gerando o token JWT com opções adicionais
    const secretKey = process.env.JWT_SECRET || "sua-chave-secreta";
    const token = jwt.sign(
      { email, userId: "123" }, // Payload do token
      secretKey,
      {
        expiresIn: "24h", // Expiração do token
        audience: "your-audience", // Público-alvo do token
        issuer: "your-issuer", // Emissor do token
      }
    );

    // 6. Retornando resposta segura
    return NextResponse.json({
      token,
      user: {
        email,
        name: "Usuário Teste",
      },
    });
  } catch (error) {
    // 7. Tratamento de erros genérico
    console.error("Erro ao fazer login:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}