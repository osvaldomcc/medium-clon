import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  regexEmail: string = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';
  emailError: string = '';
  passwordError: string = '';
  generalError: string = '';

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.regexEmail)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  login() : void {
    this.generalError = '';
    if(this.loginForm.invalid){
      return;
    }
    const user = {
      "user": {
        "email": this.loginForm.get('email')?.value,
        "password": this.loginForm.get('password')?.value,
      }
    }
    this.authService.logUserIn(user).subscribe((res) => console.log(res), (err) => this.generalError = "Email or password invalid");
    this.loginForm.reset();
  }

  //Validar funciones
  validateEmail(){
    const email = this.loginForm.get('email');
    const errors = email?.errors;
    if(errors){
      if(errors.hasOwnProperty('pattern')){
        this.emailError = "The email is invalid"
      }else if(errors.hasOwnProperty('required')){
        this.emailError = "The email is required"
      }
    }else{
      this.emailError = '';
    }    
  }

  validatePassword(){
    const errors = this.loginForm.get('password')?.errors;
    if(errors){
      if(errors.hasOwnProperty('minlength')){
        this.passwordError = "The password length is less than 6"
      }else if(errors.hasOwnProperty('required')){
        this.passwordError = "The email is required"
      }
    }else{
      this.passwordError = '';
    }    
  }


}
