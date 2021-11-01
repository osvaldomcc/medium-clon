import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { ValidatorService } from '../../../shared/validator/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  //Declaración de Variables
  emailError: string = '';
  passwordError: string = '';
  usernameError: string = '';
  password2Error: string = '';
  generalError: string = '';


  //Creación De Formulario
  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.pattern(this.validate.regexEmail)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  },{
    validators: [this.validate.notEqualFields('password', 'password2')]
  });

  //Constructor
  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private validate: ValidatorService) { }

  
  //Registrar Usuario
  registerUser(){
    this.generalError = '';
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
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


  //Getters Para Validar Formulario Y Recibir El Error
  get validateEmail(){
    this.emailError = this.validate.validateField(this.registerForm, 'email');
    return this.emailError;
  }

  get validateUsername(){
    this.usernameError = this.validate.validateField(this.registerForm ,'username', 4);
    return this.usernameError;
  }

  get validatePassword(){
    this.passwordError = this.validate.validateField(this.registerForm, 'password', 6);
    return this.passwordError;
  }

  get validatePassword2(){
    this.password2Error = this.validate.validateField(this.registerForm, 'password2', 6, 'password');
    return this.password2Error;
  }

}
