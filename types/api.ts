/**
 * Resposta padrão de sucesso
 */
export interface ApiSuccess<T> {
  success: true;
  data: T;
}

/**
 * Resposta padrão de erro
 */
export interface ApiError {
  success: false;
  error: string;
  message?: string;
}

/**
 * União genérica
 */
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

/**
 * Padrão de paginação futura
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
}

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  meta: PaginationMeta;
}