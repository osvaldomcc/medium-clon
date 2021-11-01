import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediumRoutingModule } from './medium-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    MediumRoutingModule
  ]
})
export class MediumModule { }
