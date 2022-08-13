import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';

import { ActivatedRoute, Router, RouterModule, ROUTER_INITIALIZER } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  checkPasswordsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    // custom validator function to make sure passwords match
    let password = control.parent?.get('password')?.value
    let confirmPassword = control.parent?.get('confirm-password')?.value

    return password === confirmPassword ? null : { differentPasswords: true }
  }

  registerForm = new FormGroup({
    'username': new FormControl('', [ 
      Validators.required, 
      Validators.minLength(4),
      Validators.pattern("^[a-zA-Z0-9]*$") 
    ]),
    'email': new FormControl('', [
      Validators.required, 
      Validators.email,
    ]),
    'password': new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    'confirm-password': new FormControl('', [
      Validators.required,
      this.checkPasswordsValidator
    ]), 
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    /**
     * Submit the register form and attempt to register a user through the auth service
     */

    this.authService.register(this.registerForm.value).subscribe((user: User) => {
      // successful registration
      this.router.navigate(['login'])
      this.alertService.success("Your account has successfully been created. You can now log in!")

    },  error => { 
      // handle registration errors
      if (error instanceof HttpErrorResponse) {
        const validationErrors = error.error

        if (error.status === 422) {
      
          Object.keys(validationErrors).forEach(prop => {
            // display error messages for each affected form control
            const formControl = this.registerForm.get(prop)
    
            if (formControl) formControl.setErrors({
              serverError: validationErrors[prop]
            })
            
          })
        }

      }
    })

  }

  get username() { return this.registerForm.get('username') }

  get email() { return this.registerForm.get('email') }
  
  get password() { return this.registerForm.get('password')}

  get confirmPassword() { return this.registerForm.get('confirm-password') }

}
