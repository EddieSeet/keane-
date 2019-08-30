import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  submitted: boolean = false;
  emailError: boolean = false
  passwordError: boolean = false

  loginForm: FormGroup;

  constructor(
    public adminService: AdminService,
    public router: Router
  ) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      // 'userid': new FormControl(null, [Validators.required, this.blankSpaces]),
      // 'password': new FormControl(null, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}")])
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])

    })

  }

  // onSubmit() {
  //   console.log("login success");
  //   console.log(this.loginForm.value)

  //   this.submitted = true;
  // }



  onSubmit() {
    //    console.log("login success");
    //  console.log(this.loginForm.value)

    //  console.log(this.loginForm.value["email"])

    let user = {
      "email": this.loginForm.value["email"],
      "password": this.loginForm.value["password"]
    }

    this.adminService.login(user).subscribe(
      (data: any) => {
        // console.log(data)


        this.emailError = false
        this.passwordError = false
        //do whatever i want here
        this.router.navigate(["enquiry/list"])

      },

      (err: any) => {
        console.log(err)
        //do whatever i want here 

        if (err["message"] == "Incorrect email.") {
          this.emailError = true
          this.passwordError = false
        }

        else if (err["message"] == "Incorrect  password.") {
          this.passwordError = true
          this.emailError = false

        }


      }
    )

    //    this.submitted = true;
  }

  onReset() {

    this.loginForm.reset({
      userid: '',
      password: ''
    });

    this.submitted = false;
  }

  blankSpaces(c: FormControl): { [s: string]: boolean } {

    if (c.value != null && c.value.trim().length === 0) {
      return { blankSpaces: true };
    }

    return null; // when no error found
  }




}
