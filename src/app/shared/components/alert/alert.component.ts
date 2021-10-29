import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnDestroy, AfterViewInit {
  
  @ViewChild('myAlert') myAlert!: ElementRef;
  showAlert: boolean = true;
  tOutOne: any;
  tOutTwo: any;
  tOutThree: any;

  ngAfterViewInit(): void {
    this.tOutOne = setTimeout(() => {
      this.myAlert.nativeElement.classList.remove('animate-fadeIn');
      this.myAlert.nativeElement.style.animation = 'fadeOut 1s';
    },3500);
    this.tOutTwo = setTimeout(() => {
      this.showAlert = false;
    },4000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.tOutOne);
    clearTimeout(this.tOutTwo);
    clearTimeout(this.tOutThree);
  }

  closeAlert() : void{
    clearTimeout(this.tOutOne);
    clearTimeout(this.tOutTwo);
    this.myAlert.nativeElement.style.animation = 'fadeOut 1s';
    this.tOutThree = setTimeout(() => {
      this.showAlert = false;
    },800);
  }

}
