import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateComponent } from './add-or-update.component';

describe('AddOrUpdateComponent', () => {
  let component: AddOrUpdateComponent;
  let fixture: ComponentFixture<AddOrUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrUpdateComponent]
    });
    fixture = TestBed.createComponent(AddOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
