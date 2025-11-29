import { Routes } from '@angular/router';
import { AuthRepositoryImpl } from './data/repositories/auth.repository.impl';
import { LoginUseCase } from './domain/usecases/login.usecase';
import { AuthRepository } from './domain/repositories/auth.repository';
import { AuthMapper } from './data/mappers/auth.mapper';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./presentation/pages/auth-page/auth-page.component').then(m => m.AuthPageComponent),

    //
    providers: [
      LoginUseCase,
      AuthRepositoryImpl,
      AuthMapper,  // La clase concreta
      {
        provide: AuthRepository,    // Cuando se pida el abstracto...
        useClass: AuthRepositoryImpl // ...usar la implementación concreta.
      }
      // Nota: AuthDataSource, AuthMapper y AuthService ya están
      // proveídos en 'root' (providedIn: 'root'), así que no
      // es necesario declararlos aquí.
    ]
  },
  // ... otras rutas (register, etc.)
];
