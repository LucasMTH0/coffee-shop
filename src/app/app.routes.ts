import { Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { DetailsComponent } from './screens/details/details.component';
import { CartComponent } from './screens/cart/cart.component';
import { FavoritesComponent } from './screens/favorites/favorites.component';
import { LoginComponent } from './screens/auth/login/login.component';
import { RegisterComponent } from './screens/auth/register/register.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'details/:id',
        component: DetailsComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'favorites',
        component: FavoritesComponent
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            }
        ]
    }

];
