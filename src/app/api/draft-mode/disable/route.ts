import { draftMode } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const mode = await draftMode();
  mode.disable();
  const requestedPath = request.nextUrl.searchParams.get("redirect");
  const redirect =
    requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
      ? requestedPath
      : "/en";
  return NextResponse.redirect(new URL(redirect, request.url));
}
