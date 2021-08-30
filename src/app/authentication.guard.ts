import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {


  constructor(private _router: Router,
              private _authService: AuthenticationService) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this._authService.currentUserValue;
      if (currentUser) {
          // logged in so return true
          
          return true;
      }
      
    
      this._router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
  }
  
}
