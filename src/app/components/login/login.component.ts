import { routes } from './../../app.routes';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  @Output("submit") onSubmit = new EventEmitter();

  constructor(
    private router: Router
  ){
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  submit(){
    console.log(this.loginForm.value);
    // this.onSubmit.emit(this.loginForm.value);
  }

  navigate(){
    this.router.navigate(['/']);
  }
}
