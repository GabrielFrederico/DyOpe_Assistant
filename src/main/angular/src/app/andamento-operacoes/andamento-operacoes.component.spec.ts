import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AndamentoOperacoesComponent} from './andamento-operacoes.component';

describe('AndamentoOperacoesComponent', () => {
  let component: AndamentoOperacoesComponent;
  let fixture: ComponentFixture<AndamentoOperacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AndamentoOperacoesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndamentoOperacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
