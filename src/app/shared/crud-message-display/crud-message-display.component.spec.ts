import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMessageDisplayComponent } from './crud-message-display.component';

describe('CrudMessageDisplayComponent', () => {
  let component: CrudMessageDisplayComponent;
  let fixture: ComponentFixture<CrudMessageDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudMessageDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudMessageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
