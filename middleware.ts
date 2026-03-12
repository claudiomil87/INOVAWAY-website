import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, _next, _vercel, and static files
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/_vercel/") ||
    /\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|otf|pdf|xml|txt|json)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Priority 1: cookie NEXT_LOCALE
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && (routing.locales as readonly string[]).includes(cookieLocale)) {
    // Let intlMiddleware handle routing with cookie preference
    const response = intlMiddleware(request);
    return response;
  }

  // Priority 2: Vercel geo header (x-vercel-ip-country)
  const country = request.headers.get("x-vercel-ip-country");
  if (country && !cookieLocale) {
    const geoLocale = country === "BR" ? "pt" : "en";
    // Only redirect if not already on correct locale and no locale in path
    const hasLocalePrefix = routing.locales.some(
      (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
    );
    if (!hasLocalePrefix) {
      // Clone request and set locale cookie hint for intlMiddleware
      const requestWithLocale = new NextRequest(request.url, {
        headers: new Headers(request.headers),
      });
      requestWithLocale.cookies.set("NEXT_LOCALE", geoLocale);
      const response = intlMiddleware(requestWithLocale);
      if (response) {
        response.cookies.set("NEXT_LOCALE", geoLocale, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
      }
      return response;
    }
  }

  // Default: let intlMiddleware handle (Accept-Language + defaultLocale fallback)
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - api routes
     * - _next (static files)
     * - _vercel
     * - Files with extensions (images, fonts, etc)
     */
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
