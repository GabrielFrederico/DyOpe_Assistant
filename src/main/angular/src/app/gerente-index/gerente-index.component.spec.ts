import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteIndexComponent } from './gerente-index.component';

describe('GerenteIndexComponent', () => {
  let component: GerenteIndexComponent;
  let fixture: ComponentFixture<GerenteIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenteIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
