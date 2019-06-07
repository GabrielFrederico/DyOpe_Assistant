import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CadastroSetorComponent} from './cadastro-setor.component';

describe('CadastroSetorComponent', () => {
  let component: CadastroSetorComponent;
  let fixture: ComponentFixture<CadastroSetorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroSetorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
