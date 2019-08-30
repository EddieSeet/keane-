import { Injectable } from '@angular/core';
import {Enquiry} from "../model/enquiry.model"
//import { Enquiry } from "./enquiry.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  private enquiryList: Enquiry [] = [];
  
  constructor(private httpClient: HttpClient) { }




  addEnquiry(newEnquiryInfo){

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });

    const options = {
      headers: httpHeaders
    }

    this.httpClient.post<Enquiry>("http://localhost:3000/api/enquiry", newEnquiryInfo, options)
    .subscribe((respond) => {
      this.enquiryList.push(respond);
      // this.friendUpdated.emit();
    });

  }

getlist(){

//  console.log( localStorage.getItem("Bearer-token"))
     const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+  localStorage.getItem("Bearer-token")
 
      // 'Authorization': "Bearer "+ JSON.parse(localStorage.getItem("Bearer-token"))
    })
    const options = {
      headers: httpHeaders,
    }
    return this.httpClient.get<any>("http://localhost:3000/enquiry/list" , options)
      .pipe(
        tap(data =>
          console.log(data)
        ),
        catchError(this.handleError)
      )
 
}


private handleError(res: HttpErrorResponse) {
  console.error(res);
  return throwError(res.error || 'Server error');
}

  // checkforVendor(id: any): Observable<any> {
  //   const httpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'auth-token': this.UserService.auth_token
  //   })
  //   const options = {
  //     headers: httpHeaders,
  //   }
  //   return this.http.get<any>(this.url + ":3000/api/avendor/" + id, options)
  //     .pipe(
  //       tap(data =>
  //         console.log(data)
  //       ),
  //       catchError(this.handleError)
  //     )
  // }









}
