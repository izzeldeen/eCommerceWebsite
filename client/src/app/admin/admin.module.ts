import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../Shared/shared.module';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
