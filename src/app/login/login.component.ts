import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../login';
import { LoginService } from '../login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  login: Login = new Login();
  constructor(private formbuilder: FormBuilder, private loginservice: LoginService, private toastr: ToastrService,private router: Router) { }

  ngOnInit() {
    this.loginform = this.formbuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      pass: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      utype:['',Validators.required]
    });
  }
  get formControls() { return this.loginform.controls; }
  LogIN() {
    if (this.loginform.invalid) {
      return;
    }
    this.login.uname = this.loginform.value.email;
    this.login.pass = this.loginform.value.pass;
    this.login.utype=this.loginform.value.utype;
    this.loginservice.LogIn(this.login).subscribe(user => {
      this.toastr.success('LoggedIn', '!!!!!')
    });
  }



}
