import { Injectable } from "@angular/core";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { AuthDataSource } from "../datasources/auth.datasource";
import { AuthMapper } from "../mappers/auth.mapper";
import { AuthResponse, Credentials, RegisterData } from "../../domain/models/auth.models";
import { map, Observable } from "rxjs";
import { LoginRequestDto } from "../dtos/auth.dto";

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryImpl extends AuthRepository {
  constructor(
    private dataSource: AuthDataSource,
    private mapper: AuthMapper
  ) {
    super();
  }

  login(credentials: Credentials): Observable<AuthResponse> {
    const loginDto: LoginRequestDto = {
      email: credentials.email,
      password: credentials.password,
      turnstileToken: credentials.turnstileToken
    };

    return this.dataSource.login(loginDto).pipe(
      map(apiResponse => this.mapper.authResponseDtoToModel(apiResponse.data))
    );
  }

  register(data: RegisterData): Observable<AuthResponse> {
    const registerDto = this.mapper.registerDataToDto(data);
    return this.dataSource.register(registerDto).pipe(
      map(apiResponse => {
        // Backend register returns only user data (no token)
        // Create AuthResponse with empty token for consistency
        const user = this.mapper.userResponseDtoToModel(apiResponse.data);
        return {
          token: '', // Register doesn't return token
          type: 'Bearer',
          user: user
        } as AuthResponse;
      })
    );
  }
}