const requiredEnv = ["DATABASE_URL"];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${key}`);
  }
});

export const env = {
  databaseUrl: process.env.DATABASE_URL as string,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "",
};