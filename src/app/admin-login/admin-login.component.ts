import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  submitted: boolean = false;

  loginForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.loginForm = new FormGroup ({
      'userid': new FormControl(null, [Validators.required, this.blankSpaces]),
      'password': new FormControl(null, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}")])
    })
  }

  onSubmit() {
    console.log("login success");
    console.log(this.loginForm);
    this.submitted = true;
  }

  onReset() {

    this.loginForm.reset({
      userid: '',
      password: ''
    });

    this.submitted = false;
  }
  
  blankSpaces(c: FormControl) : {[s: string]: boolean} {

    if(c.value !=null && c.value.trim().length === 0) {
      return {blankSpaces: true};
    }

    return null; // when no error found
  }
}
