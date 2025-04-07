import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddcategoryComponent } from './admin-addcategory.component';

describe('AdminAddcategoryComponent', () => {
  let component: AdminAddcategoryComponent;
  let fixture: ComponentFixture<AdminAddcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddcategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
