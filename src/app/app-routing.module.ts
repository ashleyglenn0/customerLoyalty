import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../app/home/home.component';
import { LandingPageComponent } from '../app/landing-page/landing-page.component';
import { SingleCustomerComponent } from '../app/single-customer/single-customer.component';
import { LoginComponent } from '../app/login/login.component';
import { PurchasesComponent } from '../app/purchases/purchases.component';
import { CustomerListComponent } from '../app/customer-list/customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'landingPage', component: LandingPageComponent },
  { path: 'singleCustomer/:id', component: SingleCustomerComponent },
  { path: 'customerList', component: CustomerListComponent },
  { path: 'addPurchases/:id', component: PurchasesComponent },
  { path: 'storeLogin', component: LoginComponent },
  { path: 'addCustomer', component: AddCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
