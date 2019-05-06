import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {  Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
 customerList;
 public keys : any[] = [];
 i=0;
 loggedin = "login"
  constructor(private auth: AuthService,private router: Router, public http:HttpClient) { }
  login(user,pass) { 
    this.http
    .get("https://api.mlab.com/api/1/databases/sachindaily/collections/user?apiKey=ClSj0HxNv3sPJwS3cZOsbZI9exWxVjqz")
    .subscribe((res)=>{
      console.log(res)
      this.customerList = res;
      this.keys=this.customerList;
    })
if(user==""&& pass==""){
  alert("fields cannot be blank");

}
else{
  this.keys.forEach(cust => {
    if(user==cust.name && pass==cust.name){
      this.i=1;
      localStorage.setItem("login",this.loggedin);
      this.auth.login();
      this.router.navigate(['/home']);  
    }
  });
}
if(this.i==0){
  alert("Invalid Details!");
}
  }
  ngOnInit() {
    this.http
    .get("https://api.mlab.com/api/1/databases/sachindaily/collections/user?apiKey=ClSj0HxNv3sPJwS3cZOsbZI9exWxVjqz")
    .subscribe((res)=>{
      console.log(res)
      this.customerList = res;
      this.keys=this.customerList;
    })
  }

}
