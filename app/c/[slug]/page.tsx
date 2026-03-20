import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTenantBySlug } from "@/lib/tenants";
import type { Tenant } from "@/types/tenant";

// Layouts
import TenantDefault from "@/components/tenants/default";
import TenantEquilibrioDosPes from "@/components/tenants/equilibrio-dos-pes";
import TenantBarbeariaLuizGustavo from "@/components/tenants/barbearia-luiz-gustavo";

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

  // Mapa de layouts específicos por slug
  const layoutMap: Record<string, (props: { tenant: Tenant }) => JSX.Element> = {
    "equilibrio-dos-pes": TenantEquilibrioDosPes,
    "barbearia-do-luiz-gustavo": TenantBarbeariaLuizGustavo,
  };

  const Layout = layoutMap[tenant.slug] ?? TenantDefault;

  // Sugestão de cores para a Barbearia (Predominantemente Preta)
  // Se o tenant vier do banco com essas cores, elas serão aplicadas.
  // Se você quiser forçar cores específicas aqui para esse slug:
  const themeColor = tenant.slug === "barbearia-do-luiz-gustavo" ? "#D4AF37" : tenant.themeColor; // Dourado para contraste
  const backgroundColor = tenant.slug === "barbearia-do-luiz-gustavo" ? "#0A0A0A" : tenant.backgroundColor; // Preto profundo

  return (
    <main className="main-container">
      {/* Tema dinâmico por comércio (cores e background) */}
      <style>{`
        :root {
          --color-primary: ${themeColor};
          --color-background: ${backgroundColor};
          --color-text: ${tenant.slug === "barbearia-do-luiz-gustavo" ? "#FFFFFF" : "inherit"};
        }
      `}</style>
      <Layout tenant={tenant} />
    </main>
  );
}