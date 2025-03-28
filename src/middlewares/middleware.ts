import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Constantes para rotas protegidas
const DASHBOARD_ROUTE = "/dashboard";
const LOGIN_ROUTE = "/login";

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      // Adiciona suporte para migração de sessão
      cookieName: process.env.NODE_ENV === 'production' 
        ? '__Secure-next-auth.session-token' 
        : 'next-auth.session-token'
    });

    // Verificação adicional do token
    const isValidToken = token && typeof token === 'object' && 'email' in token;

    // Verifica se a rota atual é /dashboard ou /login
    const isDashboardRoute = request.nextUrl.pathname.startsWith(DASHBOARD_ROUTE);
    const isLoginRoute = request.nextUrl.pathname.startsWith(LOGIN_ROUTE);

    // Bloqueia acesso ao /dashboard sem token
    // Atualiza a verificação para usar isValidToken
    if (isDashboardRoute && !isValidToken) {
      return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
    }

    if (isLoginRoute && isValidToken) {
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
    // Limpa a sessão corrompida
    const response = NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
    response.cookies.delete('next-auth.session-token');
    response.cookies.delete('__Secure-next-auth.session-token');
    return response;
  }
}

export const config = {
  matcher: [`${DASHBOARD_ROUTE}/:path*`, LOGIN_ROUTE],
};