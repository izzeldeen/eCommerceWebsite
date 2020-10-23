import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IProduct } from '../modules/product';
import { HomeService } from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  loginForm: FormGroup;
  constructor(private homeServices: HomeService) {
  this.createLoginFrom();
  
  }
   
  
  

  createLoginFrom() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$'
        ),
      this.exampleValidator] , this.asyncExampleValidator),
      password: new FormControl('', Validators.required),
    });
    this.loginForm.statusChanges.subscribe(
      (data: any) => console.log(data)
      );
  }
  ngOnInit(): void {
   }
   onSubmit () {
    console.log(this.loginForm);
  }

  exampleValidator(control: FormControl): {[s: string]: boolean}{
    if (control.value ===  'izz@gmail.com')
    {
      return  { example : true };
    }
    return null;
  }
  asyncExampleValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve , reject) => {
      setTimeout(() => {
        if (control.value === 'Example@gmail.com') {
          resolve({' invalid': true});
        }
        else
        {resolve(null); }
      }, 1500);
    });
    return promise;
  }

  Output(event){
    console.log(event);
    console.log("event");
  }
 
}
