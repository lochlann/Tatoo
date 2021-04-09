import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatooListComponent } from './tatoo-list.component';

describe('TatooListComponent', () => {
  let component: TatooListComponent;
  let fixture: ComponentFixture<TatooListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TatooListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TatooListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
