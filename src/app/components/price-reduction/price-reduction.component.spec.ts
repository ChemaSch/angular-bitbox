import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceReductionComponent } from './price-reduction.component';

describe('PriceReductionComponent', () => {
  let component: PriceReductionComponent;
  let fixture: ComponentFixture<PriceReductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceReductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceReductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
