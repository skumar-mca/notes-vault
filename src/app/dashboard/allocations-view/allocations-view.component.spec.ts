import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationsViewComponent } from './allocations-view.component';

describe('AllocationsViewComponent', () => {
  let component: AllocationsViewComponent;
  let fixture: ComponentFixture<AllocationsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocationsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
