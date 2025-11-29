import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RegisterData, AuthResponse } from '../models/auth.models';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthRepository } from '../repositories/auth.repository';
@Injectable({
  providedIn: 'root',
})

export class RegisterUseCase {
  constructor(
    private authService: AuthService,
    private authRepository: AuthRepository
  ) { }

  execute(data: RegisterData): Observable<AuthResponse> {
    if (data.password !== data.confirmPassword) {
      return throwError(() => new Error('Las contraseñas no coinciden.'));
    }
    if (data.password.length < 8) {
      return throwError(() => new Error('La contraseña debe tener al menos 8 caracteres.'));
    }
    return this.authRepository.register(data).pipe(

      tap(user => {
        this.authService.startSession(user);
      })
    );
  }

}