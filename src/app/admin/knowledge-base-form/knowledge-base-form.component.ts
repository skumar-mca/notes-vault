import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WYSIWYG_CONFIG } from '@app/core/app-constant';
import { HttpRequestService } from '@app/core/http-request.service';
import { SharedDataService } from '@app/core/shared-data.service';
import { KNOWLEDGEBASE } from '@app/core/url-constant';
import { CrudService } from '@app/shared/crud.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-knowledge-base-form',
  templateUrl: './knowledge-base-form.component.html',
  styleUrls: ['./knowledge-base-form.component.css']
})
export class KnowledgeBaseFormComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeEditorTextArea();
  }

  @Input() category: any

  formFields = [
    { name: 'title' },
    { name: 'content' },
    { name: 'category' },
    { name: 'technologyId' }
  ];

  editorConfig: AngularEditorConfig = WYSIWYG_CONFIG;

  constructor(private fb: FormBuilder, private ngbActiveModal: NgbActiveModal, public crudService: CrudService, private sharedDataService: SharedDataService, private httpService: HttpRequestService) {
    this.resizeEditorTextArea();
  }

  ngOnInit() {
    this.crudService.initialize(this.ngbActiveModal, KNOWLEDGEBASE, this.formFields, `Add ${this.category.title}`);
    this.createForm();
    if (this.category) {
      this.crudService.currentForm.get('category').setValue(this.category.id);
    }
  }

  createForm() {
    this.crudService.currentForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: [''],
      technologyId: ['']
    })
  }

  save() {
    this.crudService.save();
  }

  edit(obj) {
    this.httpService.get(`${KNOWLEDGEBASE}/${obj._id}?category=${obj.category}`).subscribe((resp: IResponse) => {
      if (resp.success) {
        this.crudService.modalTitle = `Edit ${this.category.title}`;
        this.crudService.currentForm.get('category').setValue(this.category.id);
        this.crudService.edit(resp.data);
      }
    })
  }

  get title() {
    return this.crudService.currentForm.get('title');
  }

  get content() {
    return this.crudService.currentForm.get('content');
  }

  resizeEditorTextArea() {
    this.editorConfig.height = `${window.innerHeight - 300}px`;
  }
}
