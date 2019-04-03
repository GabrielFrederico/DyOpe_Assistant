import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacaoAcabamentoComponent } from './operacao-acabamento.component';

describe('OperacaoAcabamentoComponent', () => {
  let component: OperacaoAcabamentoComponent;
  let fixture: ComponentFixture<OperacaoAcabamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacaoAcabamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacaoAcabamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
