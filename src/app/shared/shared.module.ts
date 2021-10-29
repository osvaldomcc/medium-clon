import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForminputComponent } from './components/forminput/forminput.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule } from "@angular/forms";
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { AlertComponent } from './components/alert/alert.component';



@NgModule({
  declarations: [
    AlertComponent,
    ErrorMessageComponent,
    ButtonComponent,
    ForminputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[
    AlertComponent,
    ErrorMessageComponent,
    ButtonComponent,
    ForminputComponent
  ]
})
export class SharedModule { }
