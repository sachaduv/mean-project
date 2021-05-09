import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;
  authSub : Subscription;

  constructor(private _auth : AuthService) { }

  ngOnInit(): void {
    this.authSub = this._auth.getAuthStatus().subscribe((auth)=>{
      this.isLoading = false;
    })
  }


  authSignup(auth:NgForm){
    if(auth.invalid){
      return
    }
    this.isLoading = true;
    this._auth.createUser(auth.value.email,auth.value.password);
  }

  ngOnDestroy(){
    this.authSub.unsubscribe();
  }
}
