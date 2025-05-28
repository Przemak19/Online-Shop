import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEdititemComponent } from './admin-edititem.component';

describe('AdminEdititemComponent', () => {
  let component: AdminEdititemComponent;
  let fixture: ComponentFixture<AdminEdititemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEdititemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEdititemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
