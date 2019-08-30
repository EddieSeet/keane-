import { Injectable } from '@angular/core';
import { Router } from "@angular/router"
import { resolve } from 'url';
import { reject } from 'q';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  loggedIn = false

  constructor(
    private router: Router,
    public httpClient: HttpClient
  ) { }



  // login(email: string, password: string) {
  //   this.loggedIn = (username == "ABC" && password == "123");
  //   console.log(this.loggedIn);
  //   if (this.loggedIn) {
  //     this.router.navigate(["/enquiry/list"])
  //   }
  // }


  login(user) {
    // this.loggedIn = (username == "ABC" && password == "123");
    // console.log(this.loggedIn);
    // if (this.loggedIn) {
    //   this.router.navigate(["/enquiry/list"])
    // }
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    });

    const options = {
      headers: httpHeaders
    }


    // console.log(user)
    //https://blog.angular-university.io/angular-jwt-authentication/

    return this.httpClient.post<any>("http://localhost:3000/auth/login", user, options)
      .pipe(
        tap(data => {
          //          console.log(data)
          //         console.log(data["token"])
          //setting in local storage. Not the most ideal, may be target of XSS attack.
          // Should also implement server side session authentication. so that server check as well 
        //  console.log(data)
          localStorage.setItem('Bearer-token', data["token"]);


        }),
        catchError(this.handleError)
      )
  }





  private handleError(res: HttpErrorResponse) {
    console.error(res);
    return throwError(res.error || 'Server error');
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(["/"]);
  }



  //check auth
  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn)
        }, 1000);
      }
    )
    return promise
  }


}
