import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './service/auth/auth.service'

import { HomeComponent } from './components/private/home/home.component'

import { RevenueComponent } from './components/private/revenue/revenue.component'
import { ShopListComponent } from './components/private/shop-list/shop-list.component'
import { SpentComponent } from './components/private/spent/spent.component'
import { ConfigComponent } from './components/private/config/config.component'

import { LoginComponent } from './components/public/login/login.component'
import { CreateAccountComponent } from './components/public/create-account/create-account.component'


const ROUTES: Routes = [

  // PUBLIC
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'createAccount', component: CreateAccountComponent },

  // PRIVATE
  { path: 'home', component: HomeComponent, canActivate: [AuthService] },
  { path: 'revenue', component: RevenueComponent, canActivate: [AuthService] },
  { path: 'spent', component: SpentComponent, canActivate: [AuthService] },
  { path: 'shoplist', component: ShopListComponent, canActivate: [AuthService] },
  { path: 'config', component: ConfigComponent, canActivate: [AuthService] },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(ROUTES, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
