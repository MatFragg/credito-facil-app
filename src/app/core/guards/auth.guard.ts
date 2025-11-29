import { inject } from "@angular/core";
import { Router, CanActivateFn } from "@angular/router";
import { AuthService } from "../services/auth.service";

/**
 * Guard to protect routes that require authentication.
 * @summary
 * This guard checks if the user is authenticated before allowing access to certain routes.
 * If the user is not authenticated, they are redirected to the login page.
 * Uses Angular Signals for synchronous auth state checking.
 * @author MattFragg
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Synchronous check using signal
  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirect to login with return URL
  router.navigate(['/auth/login'], {
    queryParams: { redirect: state.url },
    replaceUrl: true
  });
  return false;
};