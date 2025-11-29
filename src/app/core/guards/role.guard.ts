import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/role.enum';

/**
 * Factory function to create role-based guards.
 * @summary
 * Creates a guard that checks if the current user has any of the specified roles.
 * If the user is not authenticated or doesn't have the required role, they are redirected.
 * @param allowedRoles Roles that are allowed to access the route
 * @returns CanActivateFn guard function
 * @author MattFragg
 * 
 * @example
 * // In routes configuration:
 * {
 *   path: 'admin',
 *   canActivate: [roleGuard(Role.ADMIN)],
 *   loadComponent: () => import('./admin/admin.component')
 * }
 */
export function roleGuard(...allowedRoles: Role[]): CanActivateFn {
    return (route, state) => {
        const authService = inject(AuthService);
        const router = inject(Router);

        const currentUser = authService.currentUser();

        // Check if user is authenticated
        if (!currentUser) {
            router.navigate(['/auth/login'], {
                queryParams: { redirect: state.url },
                replaceUrl: true
            });
            return false;
        }

        // Check if user has any of the required roles
        const hasRole = currentUser.roles.some(role =>
            allowedRoles.includes(role)
        );

        if (hasRole) {
            return true;
        }

        // User is authenticated but doesn't have required role
        router.navigate(['/unauthorized']);
        return false;
    };
}
