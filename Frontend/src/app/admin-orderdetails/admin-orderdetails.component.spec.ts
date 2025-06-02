import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderdetailsComponent } from './admin-orderdetails.component';

describe('AdminOrderdetailsComponent', () => {
  let component: AdminOrderdetailsComponent;
  let fixture: ComponentFixture<AdminOrderdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrderdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
