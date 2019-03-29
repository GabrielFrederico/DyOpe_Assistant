import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacaoRiscoComponent } from './operacao-risco.component';

describe('OperacaoRiscoComponent', () => {
  let component: OperacaoRiscoComponent;
  let fixture: ComponentFixture<OperacaoRiscoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacaoRiscoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacaoRiscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
