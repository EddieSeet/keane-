import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './summary/summary.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MovieDetailComponent } from './summary/movie-detail/movie-detail.component';
import { HoverHighlightDirective } from './hover-highlight.directive';
import { FindPipe } from './find.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SummaryComponent,
    EnquiryComponent,
    HeaderComponent,
    AdminLoginComponent,
    MovieDetailComponent,
    HoverHighlightDirective,
    FindPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
