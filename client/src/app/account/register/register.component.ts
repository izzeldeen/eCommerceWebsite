import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IUser } from 'src/app/modules/user';
import { AccountService } from '../account.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
user: IUser;
emalExisit: true;
registerForm: FormGroup;
  constructor(private accountServices: AccountService, private router: Router) { }
  ngOnInit(): void {
    this.createRegisterForm();
    

  }
  createRegisterForm(): void{
      this.registerForm =  new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required],  this.validateEmailNotTaken()),
        userName: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$')])
      });
  }
  onSubmit(){
       this.accountServices.Register(this.registerForm.value).subscribe(response => {
         if (response.email === ''){
           this.user = response;
           localStorage.setItem('token' , this.user.token);
           this.router.navigateByUrl('shop');
         }
       }, error => {
         console.log(error);
       });
  }
    validateEmailNotTaken(): AsyncValidatorFn {
      return control => {
        return timer(500).pipe(
          switchMap(() => {
            if (!control.value) {
              return null;
            }
            return this.accountServices.checkEmailExists(control.value).pipe(
              map(res => {
                return res ? { emailExists: true } : null;
              })
            );
          })
        );
      };
    }
}
