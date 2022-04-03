import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/core/services/auth.service'; 
import { UserService } from 'src/app/core/services/user.service';
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
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.validAuth = this.loginForm.valid

    if (this.validAuth) {

      this.authService.login(this.loginForm.value).subscribe((user: User) => {
        // successful login
        this.authService.setUserInfo(user)

        this.userService.getUsers().subscribe((users: User[]) => {
          console.log(users)
        })

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
