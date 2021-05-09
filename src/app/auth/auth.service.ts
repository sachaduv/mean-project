import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {AuthData} from '../auth/auth-data'
import {environment} from '../../environments/environment';
const BACKEND_URL = environment.apiUrl + '/user/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token : string;
  private authStatus = new Subject<boolean>();
  public isAuthStatus = false;
  public tokenExpiration : any;
  private userId : string;
  constructor(private _http : HttpClient, private router : Router) { }

  isAuthenticated(){
    return this.isAuthStatus;
  }

  getToken(){
    return this.token;
  }

  getUserId(){
    return this.userId;
  }

  createUser(email:string,password:string){
    let user : AuthData = {email:email,password:password}
    this._http.post(BACKEND_URL + 'signup',user).subscribe((data)=>{
      this.router.navigate(['/'])
    },(error) =>{
      this.authStatus.next(false);
    });
  }

  login(email:string,password:string){
    let user : AuthData = {email:email,password:password}
     this._http.post<{token:string,expiresIn:number,userId:string}>(BACKEND_URL+'login',user).subscribe(user=>{
      const expiresIn = user.expiresIn;
      this.token = user.token;
      this.userId = user.userId;
      const now = new Date();
      const expiration = new Date(now.getTime() + expiresIn * 1000);
      this.saveAuthData(this.token, expiration,this.userId);
      this.setAuthTimer(user.expiresIn * 1000);
      if(this.token){
        this.isAuthStatus = true;
        this.authStatus.next(true);
        this.router.navigate(['/']);
      }
    },(error)=>{
      this.authStatus.next(false);
    });
  }

  saveAuthData(token:string,expiration:Date,userId:string){
    localStorage.setItem('token',token);
    localStorage.setItem('expiresIn',expiration.toISOString());
    localStorage.setItem('userId',this.userId);
  }

  clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId')
  }

  getAuthData(){
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');
    const userId = localStorage.getItem('userId');
    if(!token || !expiresIn){
      return null;
    }
    return  {
      token : token,
      expiresIn : new Date(expiresIn),
      userId : userId
    }
  }

  setAuthTimer(duration){
    this.tokenExpiration = setTimeout(()=>{
      this.logout();
    },duration );
  }

  autoAuthUser(){
    const userAuth = this.getAuthData();
    if(!userAuth){
      return
    }
      const now = new Date();
      const expiresIn = userAuth.expiresIn.getTime() - now.getTime();
      if(expiresIn > 0){
        this.token = userAuth.token;
        this.userId = userAuth.userId;
        this.isAuthStatus = true;
        this.setAuthTimer(expiresIn);
        this.authStatus.next(true);
      }
  }

  getAuthStatus(){
    return this.authStatus.asObservable();
  }

  logout(){
    this.token = null;
    this.isAuthStatus = false;
    this.userId = null;
    this.authStatus.next(false);
    clearTimeout(this.tokenExpiration);
    this.clearAuthData();
    this.router.navigate(['/'])
  }


}
