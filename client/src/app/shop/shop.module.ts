import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from '../app.module';
import { ProductComponent } from './product/product.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AppModule
  ]
})
export class ShopModule { }
