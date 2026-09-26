export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorBody {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorBody;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface LeadDto {
  id: string;
  name: string;
  businessName: string;
  email: string;
  website: string | null;
  country: string;
  industry: string | null;
  improvement: string | null;
  message: string | null;
  source: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadListDto {
  items: LeadDto[];
  total: number;
  page: number;
  limit: number;
}

export interface AuthUserDto {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export interface HealthDto {
  status: "ok";
  timestamp: string;
}
