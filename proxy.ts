import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "./dictionaries";

function getLocale(request: NextRequest): Locale {
  // 1. Check cookie preference
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value as Locale | undefined;
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

  // 2. Detect from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const browserLocale = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase() as Locale;
  if (browserLocale && locales.includes(browserLocale)) return browserLocale;

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal Next.js paths and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files (.ico, .png, .svg, etc.)
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a supported non-default locale prefix
  const hasLocalePrefix = locales
    .filter((l) => l !== defaultLocale)
    .some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));

  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  // If the pathname has the default locale prefix (e.g., /id/about),
  // we redirect to the version without prefix to keep URLs clean.
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const newPathname = pathname.replace(`/${defaultLocale}`, "") || "/";
    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  // At this point, the URL does not have a locale prefix (e.g., / or /about)
  const locale = getLocale(request);

  if (locale === defaultLocale) {
    // For default locale, rewrite internally so user sees / in URL
    // but Next.js sees /[lang]/...
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.rewrite(url);
  } else {
    // For other locales, redirect to the prefixed version
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|og-image.png).*)",
  ],
};
