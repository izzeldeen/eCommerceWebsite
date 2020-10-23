import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { AuthGuardGuard} from './guard/auth-guard.guard';

const routes: Routes = [
  {path : '' , component: HomeComponent},
  {path: 'shop' , component: ShopComponent },
  {path: 'account' , loadChildren: () => import('./account/account.module').then((mod) => mod.AccountModule)},
  {path: 'admin' , loadChildren: () => import('./admin/admin.module').then((mod) => mod.AdminModule)}

];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ], exports: [RouterModule]
})
export class AppRoutingModule { }
