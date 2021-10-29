import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-forminput',
  templateUrl: './forminput.component.html',
  styleUrls: ['./forminput.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ForminputComponent),
      multi: true
    }
  ]
})
export class ForminputComponent implements OnInit, ControlValueAccessor {
  
  @Input() labelTitle! : string;
  @Input() typeInput! : string;
  @Input() errorMsg! : string;
  idInput: string = '';
  input: string = '';

  ngOnInit(): void {
    this.idInput = this.labelTitle.toLocaleLowerCase();
  }

  onChange: any = () => {}
  onTouch: any = () => {}
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(input: string) {
    this.input = input;
  }

}
