import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickNotesFormComponent } from './quick-notes-form.component';

describe('QuickNotesFormComponent', () => {
  let component: QuickNotesFormComponent;
  let fixture: ComponentFixture<QuickNotesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickNotesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickNotesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
