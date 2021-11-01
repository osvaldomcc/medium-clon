import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  //Declaración de Variables
  public regexEmail: string = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';

  //Método Para Chequear Y Devolver El Error Del Campo
  errorMessage(item: AbstractControl | null, fieldName: string, long?: number ) : string {
    const errors = item?.errors;
    if(errors){
      if(errors.pattern){
        return `The ${fieldName} is invalid`;
      } else if(errors.required){
        return `The ${fieldName} is required`;
      } else if(errors.minlength){
        return `The ${fieldName} length is less than ${long}`;
      } else if(errors.notEqualFields){
        return `The ${fieldName}s are not equals`;
      }
    }
    return '';
  }

  //Método Para Chequear Si 2 Campos Son Iguales
  notEqualFields(field: string, field2: string) : ValidationErrors {
    return (formGroup: AbstractControl) => {
        const first: AbstractControl | null = formGroup.get(field);
        const second: AbstractControl | null = formGroup.get(field2);
        
        if((first?.value !== second?.value) && (second?.value !== '')){
          second?.setErrors({ notEqualFields: true });
          return { notEqualFields: true };
        }
        
        second?.setErrors(null);
      
        return null;
    }
  }

  //Método Para Chequear Si El Campo Ha Sido Tocado Y Si Tiene Errores
  validateField(form: AbstractControl, field: string, long?: number, name?: string) : string {
    const fieldToValidate: AbstractControl | null = form.get(field);
    if(fieldToValidate?.touched && fieldToValidate.errors){
      return this.errorMessage(fieldToValidate, name ?? field, long);
    }
    return '';
  }

}
