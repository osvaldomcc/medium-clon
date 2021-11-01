import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForminputComponent } from './components/forminput/forminput.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule } from "@angular/forms";
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { AlertComponent } from './components/alert/alert.component';
import { SpinnerSmallComponent } from './components/spinner-small/spinner-small.component';



@NgModule({
  declarations: [
    AlertComponent,
    ButtonComponent,
    ErrorMessageComponent,
    ForminputComponent,
    SpinnerSmallComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[
    AlertComponent,
    ButtonComponent,
    ErrorMessageComponent,
    ForminputComponent,
    SpinnerSmallComponent
  ]
})
export class SharedModule { }
