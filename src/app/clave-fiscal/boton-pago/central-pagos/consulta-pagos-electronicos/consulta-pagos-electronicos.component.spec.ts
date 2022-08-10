import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPagosElectronicosComponent } from './consulta-pagos-electronicos.component';

describe('ConsultaPagosElectronicosComponent', () => {
  let component: ConsultaPagosElectronicosComponent;
  let fixture: ComponentFixture<ConsultaPagosElectronicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaPagosElectronicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPagosElectronicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
