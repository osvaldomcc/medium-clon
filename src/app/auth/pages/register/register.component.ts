import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  regexEmail: string = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';
  emailError: string = '';
  passwordError: string = '';
  usernameError: string = '';
  password2Error: string = '';
  generalError: string = '';


  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.pattern(this.regexEmail)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) { }


  registerUser(){
    this.generalError = '';
    if(this.registerForm.invalid){
      return;
    }
    const user = {
      "user": {
        "username": this.registerForm.get('username')?.value,
        "email": this.registerForm.get('email')?.value,
        "password": this.registerForm.get('password')?.value,
      }
    }
    this.authService.registerNewUser(user).subscribe((res) => console.log(res), (err) => this.generalError = "Email or password invalid");
    this.registerForm.reset();
  }

  
  //Validar Form Funciones
  validateEmail(){
    const email = this.registerForm.get('email');
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

  validateUsername(){
    const username = this.registerForm.get('username');
    const errors = username?.errors;
    if(errors){
      if(errors.hasOwnProperty('minlength')){
        this.usernameError = "The username length is less than 4"
      } else if(errors.hasOwnProperty('required')){
        this.usernameError = "The username is required"
      }
    }else{
      this.usernameError = '';
    }    
  }

  validatePassword(){
    const errors = this.registerForm.get('password')?.errors;
    if(this.registerForm.get('password')?.value !== this.registerForm.get('password2')?.value){
      this.passwordError = "The passwords do not match"
      return;
    }
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

  validatePassword2(){
    const errors = this.registerForm.get('password2')?.errors;
    if(this.registerForm.get('password')?.value !== this.registerForm.get('password2')?.value){
      this.password2Error = "The passwords do not match"
      return;
    }
    if(errors){
      if(errors.hasOwnProperty('required')){
        this.password2Error = "The password is required"
      }
    }else{
      this.password2Error = '';
    }
  }

}
