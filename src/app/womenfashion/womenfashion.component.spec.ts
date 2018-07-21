import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenfashionComponent } from './womenfashion.component';

describe('WomenfashionComponent', () => {
  let component: WomenfashionComponent;
  let fixture: ComponentFixture<WomenfashionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenfashionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenfashionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
