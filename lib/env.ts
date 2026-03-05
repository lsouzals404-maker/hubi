const databaseUrl = process.env.DATABASE_URL || null;

if (!databaseUrl) {
  console.warn("⚠ DATABASE_URL não definida. Rodando em modo mock.");
}

export const env = {
  databaseUrl,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "",
};