import { TestBed } from '@angular/core/testing';

import { CentralDePagosService } from '../boton-pago/central-pagos/central-pagos.service';

describe('CentralDePagosService', () => {
  let service: CentralDePagosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentralDePagosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
