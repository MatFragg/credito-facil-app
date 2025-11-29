import { User } from "../../../../core/models/user.model";

export interface Credentials {
  email: string;
  password: string;
  rememberMe?: boolean;
  turnstileToken?: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  turnstileToken?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  user: User;
}