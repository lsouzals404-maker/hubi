import crypto from "crypto";

/**
 * Gera slug a partir de nome
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/**
 * Hash simples para senha (MVP)
 * ⚠️ Em produção ideal usar bcrypt
 */
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

/**
 * Verifica senha
 */
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

/**
 * Remove caracteres não numéricos (para WhatsApp)
 */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Formata data ISO curta
 */
export function formatDateISO(date: Date): string {
  return date.toISOString().split("T")[0];
}