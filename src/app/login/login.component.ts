import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

import { LoginItem } from '../models/login';
import { UserItem } from '../models/user';
import { TokenItem } from '../models/token';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifService } from '../service/notif.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = "Login";
  users: UserItem[] = [];
  loginForm: any;
  token = {} as TokenItem;
  loginUser: LoginItem = { username: '', password: '', grant_type: 'password' };
  loginError = false;
  
  @ViewChild('inputToggle', { static: false })
  elRinput!: ElementRef;
  visib = false;


  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  get visibility(){
    if(!this.visib)this.elRinput.nativeElement.type = 'text';
    if(this.visib)this.elRinput.nativeElement.type = 'password';
    this.visib = !this.visib; return this.visib;
  }
  constructor(private authService: AuthService, private userService: UserService, private router: Router, private notif: NotifService) {
    localStorage.clear();
  
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  // this.userService.getUsers().subscribe(data =>{
  //   this.users = data;
  // });


  proceedLogin() {
    if (this.loginForm.valid) {
      this.authService.saveLogin(this.loginForm.value).subscribe((res: any) => {
        debugger
        if (res == null) {
          console.log("Nothing from login");
        }
        else {
          this.token = JSON.parse(JSON.stringify(res));

          localStorage.setItem('token', this.token.access_token);
          // atob is js function to decode token
          //console.log(atob());
          this.router.navigate(["/quote"]);
        }
      },
        (err: HttpErrorResponse) => {
          this.loginForm.username = "";
          this.loginForm.password = "";
        alert(err.message);
          console.log("Error occured in Authenticating the logger");

          this.loginError = true;
        });
    }
    else{
      alert("Please fill out the Login form");
    }
  }

  SubmitForm() {
    
    this.loginUser.username = this.username;
    this.loginUser.password = this.password;
    this.proceedLogin();
    this.loginForm.reset();
  }
  CancelForm() {
    this.loginForm.reset();
    this.loginForm.removeControl();
   
  }

}
  // subscribe({
  //   next(res){
  //     if(res != null)
  //   {
  //     debugger
  //     this.token = JSON.parse(JSON.stringify(res));
  //     localStorage.setItem('token', this.token.access_token);
  //     this.router.navigate([""]);
  //   }
  //   else{
  //     console.log("Nothing from login" + res);
  //   }
  //   },
  //   error(err){
  //     console.log("Error occured in Login Component" );
  //   },
  //   complete(){
  //     console.log("Completed the login in Login Component" );
  //   }
  // })