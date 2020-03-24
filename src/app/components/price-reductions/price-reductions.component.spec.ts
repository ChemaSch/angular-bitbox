import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceReductionsComponent } from './price-reductions.component';

describe('PriceReductionsComponent', () => {
  let component: PriceReductionsComponent;
  let fixture: ComponentFixture<PriceReductionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceReductionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceReductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
