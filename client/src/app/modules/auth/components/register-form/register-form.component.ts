import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  checkPasswordsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let password = control.parent?.get('password')?.value
    let confirmPassword = control.parent?.get('confirm-password')?.value

    return password === confirmPassword ? null : { differentPasswords: true }
  }

  registerForm = new FormGroup({
    'username': new FormControl('', [ 
      Validators.required, 
      Validators.minLength(4) 
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
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.registerForm.value)
    this.authService.register(this.registerForm.value).subscribe((user: User) => {
      console.log(user)
    })

  }

  get username() { return this.registerForm.get('username') }

  get email() { return this.registerForm.get('email') }
  
  get password() { return this.registerForm.get('password')}

  get confirmPassword() { return this.registerForm.get('confirm-password') }

}
