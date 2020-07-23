import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresSelectionComponent } from './genres-selection.component';

describe('GenresSelectionComponent', () => {
  let component: GenresSelectionComponent;
  let fixture: ComponentFixture<GenresSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenresSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
