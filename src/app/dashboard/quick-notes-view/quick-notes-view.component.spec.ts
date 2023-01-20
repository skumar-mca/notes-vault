import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickNotesViewComponent } from './quick-notes-view.component';

describe('QuickNotesViewComponent', () => {
  let component: QuickNotesViewComponent;
  let fixture: ComponentFixture<QuickNotesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickNotesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickNotesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
