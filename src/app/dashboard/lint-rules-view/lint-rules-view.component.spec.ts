import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LintRulesViewComponent } from './lint-rules-view.component';

describe('LintRulesViewComponent', () => {
  let component: LintRulesViewComponent;
  let fixture: ComponentFixture<LintRulesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LintRulesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LintRulesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
