import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarantineDayComponent } from './quarantine-day.component';

describe('QuarantineDayComponent', () => {
  let component: QuarantineDayComponent;
  let fixture: ComponentFixture<QuarantineDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarantineDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarantineDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
