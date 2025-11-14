import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Middleware simplificado para PsiloUp
// Não usa Medusa, apenas redireciona se necessário
export async function middleware(request: NextRequest) {
  // Permite todas as requisições sem processamento especial
  // Você pode adicionar lógica de redirecionamento aqui se necessário
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
