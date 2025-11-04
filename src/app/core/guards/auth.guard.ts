import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable, of, switchMap, take } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isSignedIn.pipe(
      take(1), // Take the first value emitted by the Observable
      switchMap(isSignedIn => {
        if (isSignedIn) {
          return of(true); // User is signed in, allow access
        } else {
          this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
          return of(false); // User is not signed in, redirect to login
        }
      })
    );
  }

}