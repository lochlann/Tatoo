import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatooRowComponent } from './tatoo-row.component';

describe('TatooRowComponent', () => {
  let component: TatooRowComponent;
  let fixture: ComponentFixture<TatooRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TatooRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TatooRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
