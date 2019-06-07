import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OperacaoBeneficiamentoComponent} from './operacao-beneficiamento.component';

describe('OperacaoBeneficiamentoComponent', () => {
  let component: OperacaoBeneficiamentoComponent;
  let fixture: ComponentFixture<OperacaoBeneficiamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OperacaoBeneficiamentoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacaoBeneficiamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
