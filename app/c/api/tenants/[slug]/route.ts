import { NextResponse } from "next/server";
import { getTenantBySlug } from "@/lib/tenants";
import { ApiResponse } from "@/types/api";
import { TenantResponse } from "@/types/tenant";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const tenant = await getTenantBySlug(params.slug);

    if (!tenant) {
      const response: ApiResponse<null> = {
        success: false,
        error: "TENANT_NOT_FOUND",
        message: "Comércio não encontrado",
      };

      return NextResponse.json(response, { status: 404 });
    }

    const data: TenantResponse = {
      id: tenant.id,
      slug: tenant.slug,
      name: tenant.name,
      shortName: tenant.shortName,
      themeColor: tenant.themeColor,
      backgroundColor: tenant.backgroundColor,
      whatsapp: tenant.whatsapp,
      active: tenant.active,
    };

    const response: ApiResponse<TenantResponse> = {
      success: true,
      data,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Erro ao buscar tenant:", error);

    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_ERROR",
        message: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}