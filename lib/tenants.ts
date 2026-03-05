import type { Tenant } from "@/types/tenant";
import { pool } from "@/lib/db";

/**
 * MOCK (fallback): usado quando o banco não está configurado.
 * Você pode adicionar mais comércios aqui enquanto estiver sem DB.
 */
const MOCK_TENANTS: Tenant[] = [
  {
    id: "mock-1",
    slug: "equilibrio-dos-pes",
    name: "Equilíbrio dos Pés",
    shortName: "Equilíbrio dos Pés",
    themeColor: "#d4af37",
    backgroundColor: "#ffffff",
    whatsapp: "5531971377614",
    active: true,
  },
];

/**
 * Decide se o banco está "configurado" (não garante conectividade,
 * mas evita tentar conectar quando está tudo vazio/placeholder).
 */
function isDbConfigured() {
  // Prioridade 1: DATABASE_URL
  const dbUrl = (process.env.DATABASE_URL || "").trim();
  if (dbUrl && !/USUARIO|SENHA|HOST|NOME_DO_BANCO/i.test(dbUrl)) return true;

  // Prioridade 2: variáveis separadas (caso você esteja usando esse padrão)
  const host = (process.env.DB_HOST || "").trim();
  const user = (process.env.DB_USER || "").trim();
  const name = (process.env.DB_NAME || "").trim();

  if (!host || !user || !name) return false;
  if (/SEU_USUARIO|SEU_HOST|SEU_BANCO/i.test(`${host} ${user} ${name}`)) return false;

  return true;
}

/**
 * Busca um comércio por slug.
 * - Se DB configurado: busca no Postgres
 * - Se não: retorna do MOCK
 */
export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  const cleanSlug = (slug || "").trim().toLowerCase();
  if (!cleanSlug) return null;

  // Sem DB configurado -> MOCK
  if (!isDbConfigured()) {
    return MOCK_TENANTS.find((t) => t.slug === cleanSlug) ?? null;
  }

  // DB configurado -> tenta banco (se falhar, cai no MOCK)
  try {
    const { rows } = await pool.query(
      `
      SELECT
        id,
        slug,
        name,
        short_name AS "shortName",
        theme_color AS "themeColor",
        background_color AS "backgroundColor",
        whatsapp,
        active
      FROM tenants
      WHERE slug = $1
      LIMIT 1
      `,
      [cleanSlug]
    );

    const tenant = rows[0] as Tenant | undefined;
    if (tenant) return tenant;

    // Se não achou no banco, tenta MOCK (útil no dev)
    return MOCK_TENANTS.find((t) => t.slug === cleanSlug) ?? null;
  } catch (err) {
    console.error("[getTenantBySlug] DB error, falling back to MOCK:", err);
    return MOCK_TENANTS.find((t) => t.slug === cleanSlug) ?? null;
  }
}