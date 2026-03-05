import { NextResponse } from "next/server";
import { getTenantBySlug } from "@/lib/tenants";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const tenant = await getTenantBySlug(params.slug);

  if (!tenant) {
    return NextResponse.json(
      { error: "Tenant não encontrado" },
      { status: 404 }
    );
  }

  const manifest = {
    name: tenant.name,
    short_name: tenant.shortName || tenant.name,
    description: `Aplicativo de ${tenant.name}`,

    start_url: `/c/${tenant.slug}`,
    scope: `/c/${tenant.slug}`,

    display: "standalone",
    orientation: "portrait",

    background_color: tenant.backgroundColor || "#ffffff",
    theme_color: tenant.themeColor || "#0ea5e9",

    icons: [
      {
        src: `/tenant-icons/${tenant.slug}/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: `/tenant-icons/${tenant.slug}/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };

  return NextResponse.json(manifest);
}