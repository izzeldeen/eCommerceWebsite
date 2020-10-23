import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { AccountService } from '../account/account.service';
import { IUser } from '../modules/user';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
token: string;
private currentUserSource = new ReplaySubject<IUser>(1);
currentUser$ = this.currentUserSource.asObservable();
constructor(private accountService: AccountService , private router: Router) { }

  ngOnInit(): void {

  }

  getUser(){
    this.accountService.getUser().subscribe(response => {
      this.currentUserSource.next(response);
    }, error => {
        
    });
  }

  logOut(){
    this.accountService.logOut();
    this.currentUserSource.next(null);
    this.router.navigateByUrl('');
  }

}
