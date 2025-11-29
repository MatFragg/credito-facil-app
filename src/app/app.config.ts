import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthRepository } from './features/auth/domain/repositories/auth.repository';
import { AuthRepositoryImpl } from './features/auth/data/repositories/auth.repository.impl';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),

    // Provide concrete implementation for abstract AuthRepository
    { provide: AuthRepository, useClass: AuthRepositoryImpl },

    // 3. ¡Añade esta línea!
    // Esto provee HttpClient a toda la app y registra tu interceptor
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};