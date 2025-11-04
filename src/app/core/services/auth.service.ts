import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Service for handling authentication and user session management.
 * @summary
 * This service manages user authentication state, including sign-in status,
 * user ID, and username. It provides methods to check authentication status
 * and to update user session information.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  basePath: string = `${environment.serverBaseUrl}`;
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  private signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private signedInUserId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private signedInUsername: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   * Constructor for AuthService.
   * @param router The Router service.
   * @param http The HttpClient service.
   */
  constructor(private router: Router, private http: HttpClient) {
  }

  get isSignedIn() {
    return this.signedIn.asObservable();
  }

  get currentUserId() {
    return this.signedInUserId.asObservable();
  }

  get currentUsername() {
    return this.signedInUsername.asObservable();
  }

  signUp() {

  }

  signIn() {

  }

  signOut() {
    
  }
}
