import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ItemdetailsComponent } from './itemdetails/itemdetails.component';
import { CategoryComponent } from './category/category.component';
import { CategoryItemsComponent } from './category-items/category-items.component';
import { BasketComponent } from './basket/basket.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { AdminComponent } from './admin/admin.component';
import { adminGuard, userGuard } from './service/guard.service';

export const routes: Routes = [
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'item/:itemId', component: ItemdetailsComponent},
    {path: 'categories', component: CategoryComponent},
    {path: 'items/:categoryId', component: CategoryItemsComponent},
    {path: 'basket', component: BasketComponent},

    {path: 'account', component: ProfileComponent, canActivate:[userGuard]},
    {path: 'add-address', component: AddressComponent, canActivate:[userGuard]},
    {path: 'edit-address', component: AddressComponent, canActivate:[userGuard]},

    {path: 'admin', component: AdminComponent, canActivate: [adminGuard]},
    
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', redirectTo: '/home'},
    
];
