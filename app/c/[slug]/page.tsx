import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTenantBySlug } from "@/lib/tenants";
import type { Tenant } from "@/types/tenant";

// Layouts (crie esses componentes depois)
import TenantDefault from "@/components/tenants/default";
import TenantEquilibrioDosPes from "@/components/tenants/equilibrio-dos-pes";

/**
 * Faz o PWA carregar o manifest do comércio correto,
 * garantindo nome/ícone/start_url/scope por slug na instalação.
 */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    manifest: `/api/manifest/${params.slug}`,
  };
}

/**
 * Página principal do comércio: /c/[slug]
 * - Lê o slug da URL
 * - Busca o tenant no banco (multi-tenant)
 * - Aplica tema (CSS variables) do tenant
 * - Seleciona um layout específico (se existir) ou cai no padrão
 */
export default async function TenantPage({
  params,
}: {
  params: { slug: string };
}) {
  const tenant = await getTenantBySlug(params.slug);

  if (!tenant) notFound();

  // Mapa de layouts específicos por slug (quando você quiser customizar)
  const layoutMap: Record<string, (props: { tenant: Tenant }) => JSX.Element> = {
    "equilibrio-dos-pes": TenantEquilibrioDosPes,
  };

  const Layout = layoutMap[tenant.slug] ?? TenantDefault;

  return (
    <main className="main-container">
      {/* Tema dinâmico por comércio (cores e background) */}
      <style>{`
        :root {
          --color-primary: ${tenant.themeColor};
          --color-background: ${tenant.backgroundColor};
        }
      `}</style>

      <Layout tenant={tenant} />
    </main>
  );
}