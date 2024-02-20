import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTaxiComponent } from './book-taxi.component';

describe('BookTaxiComponent', () => {
  let component: BookTaxiComponent;
  let fixture: ComponentFixture<BookTaxiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookTaxiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookTaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
