import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationsFormComponent } from './allocations-form.component';

describe('AllocationsFormComponent', () => {
  let component: AllocationsFormComponent;
  let fixture: ComponentFixture<AllocationsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocationsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
