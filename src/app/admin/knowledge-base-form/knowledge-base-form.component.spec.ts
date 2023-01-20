import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeBaseFormComponent } from './knowledge-base-form.component';

describe('KnowledgeBaseFormComponent', () => {
  let component: KnowledgeBaseFormComponent;
  let fixture: ComponentFixture<KnowledgeBaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeBaseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeBaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
