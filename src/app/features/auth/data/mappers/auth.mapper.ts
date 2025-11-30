import { Injectable } from "@angular/core";
import { User } from "../../../../core/models/user.model";
import { Role } from "../../../../core/models/role.enum";
import { AuthResponse } from "../../../../core/models/auth-response.model";
import { RegisterData } from "../../domain/models/auth.models";
import {
  AuthResponseDto,
  UserResponseDto,
  RegisterRequestDto
} from "../dtos/auth.dto";

/**
 * Mapper for converting between DTOs and domain models in the auth feature.
 * @author MattFragg
 */
@Injectable({ providedIn: 'root' })
export class AuthMapper {

  /**
   * Convert AuthResponseDto (from backend) to AuthResponse domain model.
   */
  authResponseDtoToModel(dto: AuthResponseDto): AuthResponse {
    if (!dto) {
      throw new Error('AuthResponseDto is null or undefined');
    }

    if (!dto.user) {
      throw new Error('AuthResponseDto does not contain user data. Backend response: ' + JSON.stringify(dto));
    }

    return {
      token: dto.token,
      type: dto.type || 'Bearer',
      user: this.userResponseDtoToModel(dto.user)
    };
  }

  /**
   * Convert UserResponseDto to User domain model.
   */
  userResponseDtoToModel(dto: UserResponseDto): User {
    if (!dto) {
      throw new Error('UserResponseDto is null or undefined');
    }

    return {
      id: dto.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      roles: dto.roles?.map((role: string) => role as Role) || []
    };
  }

  /**
   * Convert RegisterData (from form) to RegisterRequestDto (for backend).
   */
  registerDataToDto(data: RegisterData): RegisterRequestDto {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
      turnstileToken: data.turnstileToken
    };
  }
}
