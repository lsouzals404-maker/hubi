export interface Tenant {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  themeColor: string;
  backgroundColor: string;
  whatsapp: string | null;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Resposta pública da API de tenant
 */
export interface TenantResponse {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  themeColor: string;
  backgroundColor: string;
  whatsapp: string | null;
  active: boolean;
}