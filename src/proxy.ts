import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Create the i18n middleware
const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // First, handle i18n routing
  const response = intlMiddleware(request);

  // Then check authentication for protected routes
  const { pathname } = request.nextUrl;

  // Check if the path is a dashboard route (with any locale)
  if (pathname.match(/^\/(en|fr)\/dashboard/)) {
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      // Extract locale from pathname
      const locale = pathname.split("/")[1];

      // Redirect to login with locale prefix
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
