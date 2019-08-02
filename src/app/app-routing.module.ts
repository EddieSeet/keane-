import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { SummaryComponent } from "./summary/summary.component";
import { EnquiryComponent } from "./enquiry/enquiry.component";
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MovieDetailComponent } from "./summary/movie-detail/movie-detail.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'summary', component: SummaryComponent},
  {path: 'movie-detail/:movie_id', component: MovieDetailComponent},
  {path: 'enquiry', component: EnquiryComponent},
  {path: 'adminLogin', component: AdminLoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
