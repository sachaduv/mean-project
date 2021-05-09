import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private _auth : AuthService,private router : Router) { }

  canActivate(route : ActivatedRouteSnapshot,state : RouterStateSnapshot) : boolean | Observable<boolean> | Promise<boolean>{
    let authStatus = this._auth.isAuthenticated();
    if(!authStatus){
       this.router.navigate(['/auth/login']);
    }
    return authStatus;
  }

}
