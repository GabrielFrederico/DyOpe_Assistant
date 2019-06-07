import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PerfilFuncionarioComponent} from './perfil-funcionario.component';

describe('PerfilFuncionarioComponent', () => {
  let component: PerfilFuncionarioComponent;
  let fixture: ComponentFixture<PerfilFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilFuncionarioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
