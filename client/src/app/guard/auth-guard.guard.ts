import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountServices: AccountService
  ) {}
  status = false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.accountServices.getUser().subscribe(
      (response) => {
        this.status = true;
      },
      (error) => {
        this.router.navigateByUrl('account/login');
        this.status = false;
      }
    );

    return of(this.status);
  }
}
