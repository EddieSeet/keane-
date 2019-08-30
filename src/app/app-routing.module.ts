import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { SummaryComponent } from "./summary/summary.component";

import { EnquiryComponent } from "./enquiry/enquiry/enquiry.component";

import { ListComponent } from "./enquiry/list/list.component";
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MovieDetailComponent } from "./summary/movie-detail/movie-detail.component";
import { EnquirycontainerComponent } from './enquiry/enquirycontainer/enquirycontainer.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'movie-detail/:movie_id', component: MovieDetailComponent },
  { path: 'adminLogin', component: AdminLoginComponent },


  {
    path: 'enquiry', component: EnquirycontainerComponent,
    children: [
      //list to be protected
      { path: 'list', component: ListComponent },
      
      //submit not protected
      { path: 'submit', component: EnquiryComponent },
      { path: '', redirectTo: 'submit', pathMatch: 'full' },

    ]
  },

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
