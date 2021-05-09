import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  header = "My Messages"

  private authSubscription : Subscription;
  public authStatus = false;
  constructor(private _authService : AuthService) { }

  ngOnInit(): void {
    this.authStatus = this._authService.isAuthenticated();
    this.getAuthStatus(); 
  }

  getAuthStatus(){
    this.authSubscription = this._authService.getAuthStatus().subscribe(data=>{
      this.authStatus = data;
    })
  }

  onLogOut(){
    this._authService.logout();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }




}
