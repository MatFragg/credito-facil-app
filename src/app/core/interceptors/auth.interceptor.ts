import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

/**
 * Interceptor function to add JWT Bearer token to Authorization header.
 * @summary
 * This interceptor checks for a token from AuthService and, if found,
 * adds it to the Authorization header of outgoing HTTP requests to the API.
 * Only applies to requests targeting the application's API server.
 * @param req - The outgoing HTTP request.
 * @param next - The next interceptor in the chain.
 * @returns An Observable of the HTTP event stream.
 * @author MattFragg
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Only modify requests to our API
  if (!req.url.startsWith(environment.serverBaseUrl)) {
    return next(req);
  }

  const token = authService.getToken();

  // Clone request and add authorization header if token exists
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};