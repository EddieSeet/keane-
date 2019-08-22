import { Injectable } from '@angular/core';
import {Enquiry} from "../model/enquiry.model"
//import { Enquiry } from "./enquiry.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

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











}
