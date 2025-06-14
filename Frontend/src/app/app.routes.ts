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
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminAddcategoryComponent } from './admin-addcategory/admin-addcategory.component';
import { AdminEditcategoryComponent } from './admin-editcategory/admin-editcategory.component';
import { AdminItemComponent } from './admin-item/admin-item.component'
import { AdminAdditemComponent } from './admin-additem/admin-additem.component'
import { AdminEdititemComponent } from './admin-edititem/admin-edititem.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminOrderdetailsComponent } from './admin-orderdetails/admin-orderdetails.component';

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
    {path: 'admin/categories', component: AdminCategoryComponent, canActivate: [adminGuard]},
    {path: 'admin/add-category', component: AdminAddcategoryComponent, canActivate: [adminGuard]},
    {path: 'admin/edit-category/:categoryId', component: AdminEditcategoryComponent, canActivate: [adminGuard]},
    {path: 'admin/items', component: AdminItemComponent, canActivate: [adminGuard]},
    {path: 'admin/add-item', component: AdminAdditemComponent, canActivate: [adminGuard]},
    {path: 'admin/edit-item/:itemId', component: AdminEdititemComponent, canActivate: [adminGuard]},
    {path: 'admin/orders', component: AdminOrderComponent, canActivate: [adminGuard]},
    {path: 'admin/order-details/:orderItemId', component: AdminOrderdetailsComponent, canActivate: [adminGuard]},
    
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', redirectTo: '/home'},
    
];
