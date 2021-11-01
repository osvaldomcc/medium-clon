import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { errors } from '../../../shared/errors/error-list';

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
              private validate: ValidatorService) { }

  
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
      console.log(res)
    }, (err) => {
      this.isLoading = false;
      if(err.status === 403){
        this.generalError = "Email or password are invalid";
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
