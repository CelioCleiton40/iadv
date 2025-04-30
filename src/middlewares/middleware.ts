import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Configurações
const DASHBOARD_ROUTE = "/dashboard";
const LOGIN_ROUTE = "/login";
const SESSION_COOKIE_NAME = process.env.NODE_ENV === "production"
  ? "__Secure-next-auth.session-token"
  : "next-auth.session-token";

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName: SESSION_COOKIE_NAME,
    });

    // Validação mais robusta do token
    const isValidToken =
      token &&
      typeof token === "object" &&
      "email" in token &&
      "exp" in token &&
      Date.now() < (token.exp as number) * 1000;

    const isDashboardRoute = request.nextUrl.pathname.startsWith(DASHBOARD_ROUTE);
    const isLoginRoute = request.nextUrl.pathname.startsWith(LOGIN_ROUTE);

    // Bloqueia acesso ao dashboard se não tiver token válido
    if (isDashboardRoute && !isValidToken) {
      return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
    }

    // Redireciona usuário logado para dashboard se tentar acessar /login
    if (isLoginRoute && isValidToken) {
      return NextResponse.redirect(new URL(DASHBOARD_ROUTE, request.url));
    }

    // Força HTTPS em produção
    if (
      process.env.NODE_ENV === "production" &&
      !request.url.startsWith("https://")
    ) {
      const httpsUrl = request.nextUrl.clone();
      httpsUrl.protocol = "https:";
      return NextResponse.redirect(httpsUrl);
    }

    // Previne cache de páginas protegidas
    const response = NextResponse.next();

    response.headers.set("Cache-Control", "no-store, max-age=0");
    
    // Adiciona HSTS header em produção
    if (process.env.NODE_ENV === "production") {
      response.headers.set(
        "Strict-Transport-Security",
        "max-age=63072000; includeSubDomains; preload"
      );
    }

    return response;
  } catch (error) {
    console.error("Erro no middleware:", error);

    // Limpa possíveis tokens corrompidos
    const response = NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
    response.cookies.delete("next-auth.session-token");
    response.cookies.delete("__Secure-next-auth.session-token");

    return response;
  }
}

export const config = {
  matcher: [`${DASHBOARD_ROUTE}/:path*`, LOGIN_ROUTE],
};