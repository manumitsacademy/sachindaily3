import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private authenticated = new BehaviorSubject(false);
  // isAuth = this.authenticated.asObservable();
  isAuth = false;
  constructor() { 
    console.log(this.isAuth);
    
  }
  auhtrnticated(): boolean {
    if(this.isAuth){
      return true;
    }
    else
    return false; 
  }
  login() {
    // this.authenticated.next(true);
    this.isAuth = true;
  }
}
