import { routes } from './../../app.routes';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
  ],
  // providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  @Output("submit") onSubmit = new EventEmitter();

  constructor(
    private router: Router,
  ){
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  submit(){
    console.log(this.loginForm.value);
    // this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
    //   next: () => {
    //     alert('Login');

    //   },
    //   error: () => {
    //     alert('Usuário ou senha inválidos');
    //   }

    // });
    // this.onSubmit.emit(this.loginForm.value);
  }

  navigate(){
    this.router.navigate(['/']);
  }
}
