export interface Customer {
  id: string;
  tenantId: string;
  name: string;
  whatsapp: string;
  createdAt?: string;
}

export interface LoginRequest {
  whatsapp: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  whatsapp: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  customer: Customer;
}

export interface JwtPayload {
  sub: string;        // customer id
  tenantId: string;
  iat: number;
  exp: number;
}