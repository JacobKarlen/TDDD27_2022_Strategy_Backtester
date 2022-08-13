import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service'; 
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  validAuth: boolean = true;

  loginForm = new FormGroup({
    'username': new FormControl('', [ 
      Validators.required, 
      Validators.minLength(4) 
    ]),
    'password': new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  })

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.validAuth = this.loginForm.valid

    if (this.validAuth) {

      this.authService.login(this.loginForm.value).subscribe((user: User) => {
        // successful login
        this.authService.setUserInfo(user)
        this.router.navigate(['backtester'])
        this.alertService.success("You are now logged in!")

      }, error => { 
        // handle login errors
        if (error instanceof HttpErrorResponse) {
          const authentificationError = error.error
  
          if (error.status === 401) {

            this.loginForm.setErrors({
              serverError: authentificationError.message
            })
      
          }
        }
      })
    }
  }

}
