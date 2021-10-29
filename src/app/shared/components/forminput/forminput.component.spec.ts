import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForminputComponent } from './forminput.component';

describe('ForminputComponent', () => {
  let component: ForminputComponent;
  let fixture: ComponentFixture<ForminputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForminputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForminputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
