import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IBSheetAngular } from './ibsheet-angular';

describe('IbsheetAngular', () => {
  let component: IBSheetAngular;
  let fixture: ComponentFixture<IBSheetAngular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IBSheetAngular],
    }).compileComponents();

    fixture = TestBed.createComponent(IBSheetAngular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
