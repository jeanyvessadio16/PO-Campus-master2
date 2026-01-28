import { NextRequest, NextResponse } from "next/server";

// Définir les routes publiques
const publicRoutes = ["/login", "/signup", "/forgot-password", "/"];

// Définir les routes protégées par rôle
const roleRoutes: Record<string, string[]> = {
  admin: ["/admin"],
  teacher: ["/teacher"],
  student: ["/student"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Récupérer le token et le rôle des cookies
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  // Autoriser les routes publiques
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    // Si l'utilisateur est connecté et essaie d'accéder à login/signup, le rediriger vers son dashboard
    if (
      token &&
      (pathname.startsWith("/login") || pathname.startsWith("/signup"))
    ) {
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    }
    return NextResponse.next();
  }

  // Vérifier l'authentification pour les routes protégées
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Vérifier le rôle pour les routes protégées
  if (role) {
    const allowedRoutes = roleRoutes[role] || [];
    const isAuthorized = allowedRoutes.some((route) =>
      pathname.startsWith(route),
    );

    if (!isAuthorized) {
      // Rediriger vers le dashboard de l'utilisateur
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    }
  }

  return NextResponse.next();
}

// Configuration du middleware
export const config = {
  matcher: [
    /*
     * Matcher toutes les routes sauf:
     * - api (les routes API)
     * - _next/static (les fichiers statiques)
     * - _next/image (les fichiers d'optimisation d'images)
     * - favicon.ico (le favicon)
     * - public (les fichiers publics)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
