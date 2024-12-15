import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSaleComponent } from './header-sale.component';

describe('HeaderSaleComponent', () => {
  let component: HeaderSaleComponent;
  let fixture: ComponentFixture<HeaderSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderSaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
