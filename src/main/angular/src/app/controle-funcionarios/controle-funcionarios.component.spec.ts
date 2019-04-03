import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleFuncionariosComponent } from './controle-funcionarios.component';

describe('ControleFuncionariosComponent', () => {
  let component: ControleFuncionariosComponent;
  let fixture: ComponentFixture<ControleFuncionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControleFuncionariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
