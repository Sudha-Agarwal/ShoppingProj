import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListProductComponent } from './admin-list-product.component';

describe('AdminListProductComponent', () => {
  let component: AdminListProductComponent;
  let fixture: ComponentFixture<AdminListProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
