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

  const hasLocalePrefix = routing.locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );

  // Bug 1 fix: For paths without a locale prefix (= default PT locale), the explicit
  // URL must take priority over any NEXT_LOCALE cookie. Without this, a user with
  // NEXT_LOCALE=en visiting /blog/o-que-sao-ai-agents gets redirected to
  // /en/blog/o-que-sao-ai-agents which returns 404 because the EN slug differs.
  //
  // We strip NEXT_LOCALE from the Cookie header so intlMiddleware sees no cookie
  // preference and falls back to the path-based detection (default locale = PT).
  if (!hasLocalePrefix) {
    const existingCookies = request.headers.get("cookie") ?? "";
    const strippedCookies = existingCookies
      .split(";")
      .filter((c) => !c.trim().startsWith("NEXT_LOCALE="))
      .join(";");

    const modifiedHeaders = new Headers(request.headers);
    modifiedHeaders.set("cookie", strippedCookies);

    const modifiedRequest = new NextRequest(request.url, {
      headers: modifiedHeaders,
    });

    return intlMiddleware(modifiedRequest);
  }

  // For paths that already have a locale prefix (/en/...), the URL is the explicit
  // user choice. We extract the locale from the URL and set it as cookie so
  // intlMiddleware respects it. This prevents geo-detection (x-vercel-ip-country)
  // from overriding the user's explicit locale choice.
  //
  // Example: Brazilian user visits /en/blog → URL says "en", so we honor "en"
  // regardless of x-vercel-ip-country=BR.
  const urlLocale = routing.locales.find(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );

  if (urlLocale) {
    // Strip any geo-detection influence: set cookie to match URL locale
    const existingCookies = request.headers.get("cookie") ?? "";
    const strippedCookies = existingCookies
      .split(";")
      .filter((c) => !c.trim().startsWith("NEXT_LOCALE="))
      .join(";");

    const modifiedHeaders = new Headers(request.headers);
    modifiedHeaders.set("cookie", `${strippedCookies}; NEXT_LOCALE=${urlLocale}`);

    const modifiedRequest = new NextRequest(request.url, {
      headers: modifiedHeaders,
    });

    const response = intlMiddleware(modifiedRequest);
    if (response) {
      response.cookies.set("NEXT_LOCALE", urlLocale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }
    return response;
  }

  // Default fallback (shouldn't reach here due to hasLocalePrefix check above)
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
