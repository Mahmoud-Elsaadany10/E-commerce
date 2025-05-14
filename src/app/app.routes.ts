import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart/cart.component';

import { LoginComponent } from './registration/login/login.component';
import { SingupComponent } from './registration/singup/singup.component';
import { HomeComponent } from './home/home/home.component';
import { DetailsComponent } from './details/details/details.component';
import { isloggedGuard } from './core/guard/is-logged-in.guard';
import { PaymentSuccessComponent } from './shared/payment-success/payment-success.component';
import { PaymentFailedComponent } from './shared/payment-failed/payment-failed.component';

export const routes: Routes = [
  {path:"home",component : HomeComponent},
  { path: 'cart', component: CartComponent },
  {path :"login" ,component :LoginComponent ,canActivate:[isloggedGuard]},
  {path :"register" ,component :SingupComponent , canActivate:[isloggedGuard]},
  {path :"success" ,component :PaymentSuccessComponent},
  {path: "failed" ,component :PaymentFailedComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
