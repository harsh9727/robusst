import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { buildOgImageJsx } from "~/utils/og-template";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Robusst";
  const description =
    searchParams.get("description") ??
    searchParams.get("excerpt") ??
    "AI Solutions for Telecom & Banking Digital Transformation";

  return new ImageResponse(buildOgImageJsx(title, description), {
    width: 1200,
    height: 630,
  });
}
