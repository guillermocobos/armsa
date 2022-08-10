import { AbstractControl } from '@angular/forms';

const cuitValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
  const cuit = control.value;
  const returnFail = {'cuit': true};

  if (cuit !== null && cuit !== undefined) {
    if (cuit.length === 0) {
      return null;
    }
    if (cuit.length > 0 && (isNaN(cuit) || cuit.length !== 11)) {
      return returnFail;
    }

    let acumulado = 0;
    const digitos = cuit.split('');
    const digito = Number(digitos.pop());

    for (let i = 0; i < digitos.length; i++) {
      acumulado += digitos[9 - i] * (2 + (i % 6));
    }

    let verif = 11 - (acumulado % 11);

    if (verif === 11) {
      verif = 0;
    } else if (verif === 10) {
      verif = 9;
    }

    return digito !== verif ? returnFail : null;
  }

  return null;
};

export default cuitValidator;
