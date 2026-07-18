export interface CustomerProfileDto {
  avatarUrl?: string;
  name?: string;
  birthday?: string;
  phoneNumber?: string;
  email?: string;
}

export interface CustomerAddressDto {
  country?: string;
  city?: string;
  street?: string;
}

export interface UserState {
  profile: CustomerProfileDto | null;
  address: CustomerAddressDto | null;
  isLoading: boolean;
  error: string | null;
}
