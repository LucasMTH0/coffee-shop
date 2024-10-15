import { RegisterComponent } from './screens/auth/register/register.component';
import { FavoritesComponent } from './screens/favorites/favorites.component';
import { DetailsComponent } from './screens/details/details.component';
import { LoginComponent } from './screens/auth/login/login.component';
import { HomeComponent } from './screens/home/home.component';
import { CartComponent } from './screens/cart/cart.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
