import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditcategoryComponent } from './admin-editcategory.component';

describe('AdminEditcategoryComponent', () => {
  let component: AdminEditcategoryComponent;
  let fixture: ComponentFixture<AdminEditcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditcategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
