import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse, Credentials } from '../models/auth.models';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  constructor(
    private authRepository: AuthRepository, // Asumiendo que tienes el repo
    private authService: AuthService
  ) {}

  execute(credentials: Credentials): Observable<AuthResponse> {
    return this.authRepository.login(credentials).pipe(
      tap(user => {
        // ¡Éxito! La API devolvió un usuario y la cookie ya está en el navegador.
        // Ahora, le decimos al AuthService que actualice el estado global de la app.
        this.authService.startSession(user);
      })
    );
  }
}