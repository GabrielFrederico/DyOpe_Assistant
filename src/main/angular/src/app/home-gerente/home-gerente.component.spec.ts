import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGerenteComponent } from './home-gerente.component';

describe('HomeGerenteComponent', () => {
  let component: HomeGerenteComponent;
  let fixture: ComponentFixture<HomeGerenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeGerenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
