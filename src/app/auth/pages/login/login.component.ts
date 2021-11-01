import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { errors } from '../../../shared/errors/error-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  //Declaración de Variables
  emailError: string = '';
  passwordError: string = '';
  generalError: string = '';
  isLoading: boolean = false;

  //Creación De Formulario
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validate.regexEmail)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  //Constructor
  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private validate: ValidatorService,
              private router: Router) { }

  
  //Loguear Usuario
  login() : void {
    this.generalError = '';
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const user = {
      "user": {
        "email": this.loginForm.get('email')?.value,
        "password": this.loginForm.get('password')?.value,
      }
    }
    this.authService.logUserIn(user).subscribe((res) => {
      this.isLoading = false;
      console.log(res);
      this.router.navigateByUrl('/');
    }, (err) => {
      this.isLoading = false;
      const status: number = err.status;
      if(status === 403){
        this.generalError = "Email or password are invalid";
      } else if(status === 401){
        this.generalError = errors[`error${status}`];
      } else {
        this.generalError = "Please contact the admin";
      }
    });
    
    this.loginForm.reset();
  }

  //Getters Para Validar Formulario Y Recibir El Error
  get validateEmail(){
    this.emailError = this.validate.validateField(this.loginForm, 'email');
    return this.emailError;
  }

  get validatePassword(){
    this.passwordError = this.validate.validateField(this.loginForm, 'password', 6);
    return this.passwordError;
  }


}
