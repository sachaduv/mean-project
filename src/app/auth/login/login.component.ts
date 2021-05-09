import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading  = false;
  authSub : Subscription;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.authSub = this.auth.getAuthStatus().subscribe((auth)=>{
      this.isLoading = false;
    })
  }

  authLogin(auth:NgForm){
    if(auth.invalid){
      return
    }
    this.isLoading = true;
    this.auth.login(auth.value.email,auth.value.password);
  }

  ngOnDestroy(){
    this.authSub.unsubscribe();
  }
}
