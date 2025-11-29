/**
 * Data Transfer Objects for authentication endpoints.
 * These DTOs mirror the backend API contracts exactly.
 * @author MattFragg
 */

import { ApiResponse } from "../../../../shared/models/base-api-response.dto";

export interface LoginRequestDto {
  email: string;
  password: string;
  turnstileToken?: string;
}

export interface RegisterRequestDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  turnstileToken?: string;
}

export interface UserResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[]; // Backend: Set<Role>, JSON: string[]
}

export interface AuthResponseDto {
  token: string;
  type: string | null; // "Bearer" or null
  user: UserResponseDto;
}

// Login returns AuthResponse with token
export type LoginResponseDto = ApiResponse<AuthResponseDto>;

// Register returns just User (no token)
export type RegisterResponseDto = ApiResponse<UserResponseDto>;