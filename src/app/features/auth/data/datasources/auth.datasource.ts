import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { LoginRequestDto, LoginResponseDto, RegisterRequestDto, RegisterResponseDto } from '../dtos/auth.dto';

@Injectable({ providedIn: 'root' })
export class AuthDataSource {
  private basePath = `${environment.serverBaseUrl}/auth`;

  constructor(private http: HttpClient) { }

  login(dto: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.basePath}/login`, dto);
  }

  register(dto: RegisterRequestDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(`${this.basePath}/register`, dto);
  }
}