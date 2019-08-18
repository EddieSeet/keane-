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
    //initializing the form group when angular load
    this.enquiryForm = new FormGroup ({
      'useremail': new FormControl(null, [Validators.required, Validators.email]),
      'userenquiry': new FormControl(null, [Validators.required, this.blankSpaces]),
      'usermessage': new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
  }

  onSubmit() {
    console.log("Go to next page for submit");
//    console.log(this.enquiryForm);
    console.log(this.enquiryForm.value)
    this.submitted = true;
    // this.onReset()
  }

  onReset() {
    console.log("Reset form")
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
    console.log("Add Enquiry");

    this.enquiryService.addEnquiry(new Enquiry(
      this.enquiryForm.value.useremail,
      this.enquiryForm.value.userenquiry,
      this.enquiryForm.value.usermessage))
  
    this.onReset()
    }




}
