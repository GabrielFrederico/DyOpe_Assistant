import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacaoCorteComponent } from './operacao-corte.component';

describe('OperacaoCorteComponent', () => {
  let component: OperacaoCorteComponent;
  let fixture: ComponentFixture<OperacaoCorteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacaoCorteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacaoCorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
