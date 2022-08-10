import {Injectable } from '@angular/core';
@Injectable()
export class Util {
    public createFormData(object: object, form?: FormData, namespace?: string): FormData {
        const formData = form || new FormData();
        for (const property in object) {
            if (!object.hasOwnProperty(property) || !object[property]) {
                continue;
            }
            const formKey = namespace ? `${namespace}[${property}]` : property;
            if (object[property] instanceof Date) {
                formData.append(formKey, object[property].toISOString());
            } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
                this.createFormData(object[property], formData, formKey);
            } else {
                formData.append(formKey, object[property]);
            }
        }
        return formData;
    }

  /**
   * Para convertir a minusculas los atributos de los objetos que vienen desde el backend con oracle en Mayusculas
   * así utilizarlos directamente sin necesidad de crear models para mapear dichos atributos
   * @param object Es un objeto javascript comun que representa un registro de la base de datos
   * @param camelCase Si esta en true significa que ademas se quiere convertir los atributos con guiones a camelCase
   */
  public toLowercaseAttributes(object, camelCase = false) {
      return Object.keys(object).reduce((c, k) => {
        let lower = k.toLowerCase();
        if (camelCase) {
          lower = this.toCamelCase(lower);
        }
        return (c[lower] = object[k], c);
      }, {});
    }

  public toCamelCase = (s) => {
    return s.replace(/([-_][a-z])/ig, ($1) => {
      return $1.toUpperCase()
        .replace('-', '')
        .replace('_', '');
    });
  }
}

