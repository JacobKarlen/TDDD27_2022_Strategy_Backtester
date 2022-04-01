import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  registerForm = this.formBuilder.group({
    'username': '',
    'email': '',
    'password': '',
    'repeat-password': ''
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

}
