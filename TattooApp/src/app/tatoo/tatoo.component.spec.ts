import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatooComponent } from './tatoo.component';

describe('TatooComponent', () => {
  let component: TatooComponent;
  let fixture: ComponentFixture<TatooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TatooComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TatooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
