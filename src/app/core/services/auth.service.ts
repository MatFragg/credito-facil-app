import { Injectable, signal, computed } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, map } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-response.model';

/**
 * Service for handling authentication and user session management.
 * Uses Angular Signals for reactive state management and JWT tokens.
 * @summary
 * This service manages user authentication state, including JWT token storage,
 * user information, and authentication status. It provides methods for session
 * management and token retrieval.
 * @author MattFragg
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly basePath = `${environment.serverBaseUrl}/auth`;
  private readonly TOKEN_KEY = 'auth_token';

  // Private signals for internal state management
  private currentUserSignal = signal<User | null>(null);
  private tokenSignal = signal<string | null>(null);

  // Public computed signals for reactive access
  public currentUser = computed(() => this.currentUserSignal());
  public isAuthenticated = computed(() => this.currentUserSignal() !== null);
  public token = computed(() => this.tokenSignal());

  /**
   * Constructor for AuthService.
   * @param router The Router service.
   * @param http The HttpClient service.
   */
  constructor(private router: Router, private http: HttpClient) {
    this.loadTokenFromStorage();
  }

  /**
   * Load token from localStorage on initialization.
   * Also decode JWT to extract user information.
   * @private
   */
  private loadTokenFromStorage(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.tokenSignal.set(token);

      // Decode JWT to extract user information
      try {
        const user = this.decodeToken(token);
        if (user) {
          this.currentUserSignal.set(user);
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        // If token is invalid, clear it
        this.clearSession();
      }
    }
  }

  /**
   * Decode JWT token to extract user information.
   * @param token The JWT token to decode
   * @returns User object or null if decoding fails
   * @private
   */
  private decodeToken(token: string): User | null {
    try {
      // JWT structure: header.payload.signature
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }

      // Decode the payload (second part)
      const payload = JSON.parse(atob(parts[1]));

      // Check if token is expired
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        console.warn('Token is expired');
        return null;
      }

      // Extract user information from payload
      // Adjust these fields based on your JWT structure
      const user: User = {
        id: payload.userId || 0,
        email: payload.sub || '',
        firstName: payload.firstName || '',
        lastName: payload.lastName || '',
        roles: payload.roles || []
      };

      return user;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Start a new session with authentication response.
   * Stores token and user information.
   * @param authResponse The authentication response from login/register
   */
  public startSession(authResponse: AuthResponse): void {
    this.tokenSignal.set(authResponse.token);
    this.currentUserSignal.set(authResponse.user);
    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
  }

  /**
   * Check current session validity by fetching user data from backend.
   * @returns Observable that completes when session check is done
   */
  public checkSession(): Observable<void> {
    return this.http.get<User>(`${this.basePath}/me`).pipe(
      tap(user => {
        this.currentUserSignal.set(user);
      }),
      catchError(error => {
        this.clearSession();
        return of(undefined);
      }),
      map(() => void 0)
    );
  }

  /**
   * Sign out the current user.
   * Clears session and navigates to login page.
   * @returns Observable that completes when logout is done
   */
  public signOut(): Observable<void> {
    return this.http.post<void>(`${this.basePath}/logout`, {}).pipe(
      tap(() => {
        this.clearSession();
        this.router.navigate(['/auth/login'], { replaceUrl: true });
      }),
      catchError(() => {
        // Even if logout fails on backend, clear frontend session
        this.clearSession();
        this.router.navigate(['/auth/login'], { replaceUrl: true });
        return of(void 0);
      })
    );
  }

  /**
   * Clear the current session.
   * Removes user data and token from memory and storage.
   * @private
   */
  private clearSession(): void {
    this.tokenSignal.set(null);
    this.currentUserSignal.set(null);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Get the current JWT token.
   * @returns The current token or null if not authenticated
   */
  public getToken(): string | null {
    return this.tokenSignal();
  }
}
