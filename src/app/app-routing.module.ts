import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../app/home/home.component';
import { LandingPageComponent } from '../app/landing-page/landing-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'landingPage', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
