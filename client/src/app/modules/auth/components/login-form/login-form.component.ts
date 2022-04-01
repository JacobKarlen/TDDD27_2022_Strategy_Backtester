import { Component, OnInit } from '@angular/core';

import { FormBuilder } from "@angular/forms";
import { AuthService } from 'src/app/core/services/auth.service'; 
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  })

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe((user: User) => {
      console.log(user)
    })

  }

}
