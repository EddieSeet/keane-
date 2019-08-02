import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EnquiryService } from "./enquiry.service";
import { Enquiry } from './enquiry.model';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {

  submitted: boolean = false;

  enquiryForm: FormGroup;

  constructor(private enquiryService: EnquiryService) { }

  ngOnInit() {
    this.enquiryForm = new FormGroup ({
      'useremail': new FormControl(null, [Validators.required, Validators.email]),
      'userenquiry': new FormControl(null, [Validators.required, this.blankSpaces]),
      'usermessage': new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
  }

  onSubmit() {
    console.log("enquiry submission");
    console.log(this.enquiryForm);
    this.submitted = true;
  }

  onReset() {

    this.enquiryForm.reset({
      useremail: '',
      userenquiry: '',
      usermessage: ''
    });

    this.submitted = false;
  }
  
  blankSpaces(c: FormControl) : {[s: string]: boolean} {

    if(c.value !=null && c.value.trim().length === 0) {
      return {blankSpaces: true};
    }

    return null; // when no error found
  }

  onAddEnquiry(){
    console.log("adding enquiry");

    this.enquiryService.addEnquiry( new Enquiry( 
      this.enquiryForm.value.useremail,
      this.enquiryForm.value.userenquiry,
      this.enquiryForm.value.usermessage));
  }

}
