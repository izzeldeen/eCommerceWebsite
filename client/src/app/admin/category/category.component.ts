import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryform: FormGroup;
  constructor(private adminServices: AdminService , private route:Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.categoryform = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    this.adminServices.upsertCategory(this.categoryform.value).subscribe(response =>{
      this.route.navigateByUrl('');
    }, error => {
      console.log(error);
    });
  }

}
