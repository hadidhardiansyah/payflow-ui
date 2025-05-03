import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordComplexityValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value: string = control.value || '';
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;

  return regex.test(value)
    ? null
    : {
        passwordComplexityValidator: true,
      };
}
