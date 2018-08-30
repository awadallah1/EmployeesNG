import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private router: Router
   
  ) {}

  ////////not gooooood
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.auth.user.pipe(
  //     take(1),
  //     map(user => !!user),
  //     tap(loggedIn => {
  //       if (!loggedIn) {
  //         console.log('access denied');
  //         this.router.navigate(['login']);
  //       }
  //     })
  //   );
  // }

  //// very Goooooooooood
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {
    return this.auth.authState.pipe(
      take(1),
      map((authState) => !!authState),
      tap(authenticated => {
        if (!authenticated) this.router.navigate(['/login'])
      })
    )
  }
}