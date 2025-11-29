/**
 * Interface representing a base Data Transfer Object (DTO).
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}