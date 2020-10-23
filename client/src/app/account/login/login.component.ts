import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/modules/user';
import {ILogin} from '../../modules/account';
import { AccountService } from '../account.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  login: ILogin;
  user: IUser;
  constructor(private accountServices: AccountService , private router: Router) {
  this.createLoginFrom();
  }
  createLoginFrom(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern( '^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$')]),
      password: new FormControl('', [Validators.required , Validators.pattern("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$")])
    });
  }
  ngOnInit(): void {
   }
   onSubmit(): void {
    this.accountServices.Login(this.loginForm.value).subscribe(response => {
      this.user = response;
      if (this.user.email !== ''){
        localStorage.setItem('token' , this.user.token);
        console.log(this.user.token)
        this.router.navigateByUrl('');
      }
    }, error => {
      console.log(error);
    });
  }
}
