import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopComponent } from './shop/shop.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './account/login/login.component';
import { AccountModule } from './account/account.module';
import { CategoryComponent } from './admin/category/category.component';
import { AppRoutingModule } from './app-routing.module';
import { TextInputComponent } from './Shared/text-input/text-input.component';
import { SharedModule } from './Shared/shared.module';
import { ShopModule } from './shop/shop.module';
import { ProductComponent } from './shop/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    NavbarComponent,
    CategoryComponent,
    ProductComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AccountModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
