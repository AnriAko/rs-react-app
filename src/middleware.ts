import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, type Locales } from '~/lib/locales';

const DEFAULT_LOCALE: Locales = locales.en;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathHasLocale = Object.values(locales).some((locale) =>
    pathname.startsWith(`/${locale}`)
  );
  if (pathHasLocale) {
    return NextResponse.next();
  }
  return NextResponse.redirect(
    new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|api|.*\\..*).*)'],
};
