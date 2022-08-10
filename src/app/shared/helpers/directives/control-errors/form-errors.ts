import { InjectionToken } from '@angular/core';


export const defaultErrors = {
  required: (error) => `Este dato es obligatorio`,
  minlength: ({ requiredLength, actualLength }) => `Debe ingresar ${requiredLength} caracteres como mínimo. Ingresó ${actualLength}`,
  maxlength: ({ requiredLength, actualLength }) => `Debe ingresar ${requiredLength} caracteres como máximo. Ingresó ${actualLength}`
}

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
