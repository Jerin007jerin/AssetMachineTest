import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../login';
import { LoginService } from '../login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserReg } from '../user-reg';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  userform: FormGroup;
  login: Login = new Login();
  user: UserReg = new UserReg();
  isSubmitted = false;
  constructor(private formbuilder: FormBuilder, private loginservice: LoginService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {

    this.loginform = this.formbuilder.group({
      uname: ['', Validators.compose([Validators.required, Validators.email])],
      pass: ['', [Validators.required]]

    });
    /*this.userform = this.formbuilder.group({
      ut_id: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      addr: ['', Validators.required],
      phno: ['', Validators.required],
      u_id: ['', Validators.required]
    })*/
  }
  get formControls() { return this.loginform.controls; }
  /*get formcontrols() { return this.userform.controls; }*/
  loginUser() {
    console.log(this.loginform.value);
    //this.login.username=this.loginForm.controls.username.value;
    //this.login.password=this.loginForm.controls.password.value;
    this.isSubmitted = true;
    if (this.loginform.invalid) {
      this.toastr.error('Enter username and password');
      return;
    }
    this.loginservice.LogIn(this.loginform.value).subscribe(data => {
      data.forEach(element => {

        if (element["utype"] == 'admin') {
          // this.toastr.success('Successfully Logged in');
          localStorage.setItem('ACCESS_TOKEN', element["uname"]);
          this.router.navigateByUrl('/assetlist');
          this.toastr.success('Welcome Admin', 'Login Successful');
        }
        else if (element["utype"] == 'user') {

          this.router.navigateByUrl('/purchaselist');
          this.toastr.success('Welcome Purchase Manager', 'Login Successful');
         
        }
       

      });
      
    })
    if (localStorage.getItem('ACCESS_TOKEN') == "") {
      this.toastr.warning('Enter valid Username and Password');
    }
  }

  

  /*UserReg() {
    if (this.userform.invalid) {
      return;
    }
    else {
      if (this.userform.value.pass !== this.userform.value.rpass) {
        alert('Password Missmatch');
      }
      else {
        this.user.fname = this.userform.controls.fname.value;
        this.user.lname = this.userform.controls.lname.value;
        this.user.dob = this.userform.controls.dob.value;
        this.user.gender = this.userform.controls.gender.value;
        this.user.addr = this.userform.controls.addr.value;
        this.user.u_id = this.userform.controls.u_id.value;
        this.loginservice.userreg(this.user).subscribe(x => {
          if (this.user.ut_id > 0) {
            alert('Account created successfully');
          }
          else {
            alert('Account already exist');
          }
        })
      }
    }
  }*/
}
