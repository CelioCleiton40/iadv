import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Constantes para rotas protegidas
const DASHBOARD_ROUTE = "/dashboard";
const LOGIN_ROUTE = "/login";

export async function middleware(request: NextRequest) {
  try {
    // Obtém o token JWT do usuário
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Verifica se a rota atual é /dashboard ou /login
    const isDashboardRoute = request.nextUrl.pathname.startsWith(DASHBOARD_ROUTE);
    const isLoginRoute = request.nextUrl.pathname.startsWith(LOGIN_ROUTE);

    // Bloqueia acesso ao /dashboard sem token
    if (isDashboardRoute && !token) {
      return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
    }

    // Evita que usuários autenticados acessem /login
    if (isLoginRoute && token) {
      return NextResponse.redirect(new URL(DASHBOARD_ROUTE, request.url));
    }

    // Força o uso de HTTPS para todas as requisições
    if (!request.url.startsWith("https://") && process.env.NODE_ENV === "production") {
      const httpsUrl = request.nextUrl.clone();
      httpsUrl.protocol = "https";
      return NextResponse.redirect(httpsUrl);
    }

    // Previne armazenamento em cache de páginas protegidas
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    console.error("Erro no middleware:", error);

    // Redireciona para uma página de erro genérica em caso de falha crítica
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

export const config = {
  matcher: [`${DASHBOARD_ROUTE}/:path*`, LOGIN_ROUTE],
};