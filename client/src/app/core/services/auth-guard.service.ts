import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  /**
   * Authentication Guard used to restrict access to routes
   * if the user isn't authenticated and logged in.
   * 
   * @param authService 
   * @param route 
   */

  constructor(private authService : AuthService, private route : Router) { }

  canActivate(){
    if(this.authService.isAuthenticated()){
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }
}	

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardSerivce implements CanActivate {
  /**
   * Guard service used to restrict access to routes if the
   * user is already logged in. Used to restrict access to login/register pages.
   * 
   * @param authService 
   * @param route 
   */

  constructor(private authService : AuthService, private route : Router) { }

  canActivate(){
    if(!this.authService.isAuthenticated()){
      return true;
    }
    this.route.navigate(['backtester']);
    return false;
  }

}