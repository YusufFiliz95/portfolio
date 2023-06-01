import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotDoneYetComponent } from './not-done-yet.component';

describe('NotDoneYetComponent', () => {
  let component: NotDoneYetComponent;
  let fixture: ComponentFixture<NotDoneYetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotDoneYetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotDoneYetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
