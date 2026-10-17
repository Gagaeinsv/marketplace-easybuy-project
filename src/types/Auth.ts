// types/Auth.ts
export interface AuthState {
  accessToken: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  needsEmailVerification: boolean;
}

export interface AuthResponse {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface Credentials {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: 'CUSTOMER' | 'SELLER' | string;
}
