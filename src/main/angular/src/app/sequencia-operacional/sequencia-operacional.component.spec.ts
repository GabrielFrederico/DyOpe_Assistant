import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SequenciaOperacionalComponent } from './sequencia-operacional.component';

describe('OperacaoRiscoComponent', () => {
  let component: SequenciaOperacionalComponent;
  let fixture: ComponentFixture<SequenciaOperacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenciaOperacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenciaOperacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
