import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.isLoggedIn
      .pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          console.log('Auth Guard', isLoggedIn);
          if (!isLoggedIn) {
            console.log('navigating to login page')
            this.router.navigate(['/login']);
            return false;
          }
          console.log('user logged in');
          return true;
        })
      );

    // if (!this.auth.isAuthenticated) {
    //     // not logged in so redirect to login page with the return url and return false
    //     this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    //     return false;
    // }
    // return true;
  }
}
