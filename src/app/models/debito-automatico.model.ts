export class DebitoAutomaticoModel {
    numeroTarjeta: string;
    constructor(obj?: any) {
      this.numeroTarjeta = obj.NUMEROS_CBU || '';
    }
  }
