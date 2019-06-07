import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CadastroGerenteComponent} from './cadastro-gerente.component';

describe('CadastroGerenteComponent', () => {
  let component: CadastroGerenteComponent;
  let fixture: ComponentFixture<CadastroGerenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroGerenteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
