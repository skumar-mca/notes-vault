import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LINK } from '@app/core/url-constant';
import { CrudService } from '@app/shared/crud.service';
import { SharedDataService } from '@app/core/shared-data.service';

@Component({
  selector: 'app-links-form',
  templateUrl: './links-form.component.html',
  styleUrls: ['./links-form.component.css']
})
export class LinksFormComponent implements OnInit {
  formFields = [
    { name: 'title' },
    { name: 'url' },
    { name: 'projectId' }
  ];
  projectsList: any;
  selectedprojectName: any;
  constructor(private fb: FormBuilder, private ngbActiveModal: NgbActiveModal, public crudService: CrudService, private sharedDataService: SharedDataService) {
    this.createForm();
  }

  ngOnInit() {
    this.crudService.initialize(this.ngbActiveModal, LINK, this.formFields, "Add Link");
    this.sharedDataService.projectSource.subscribe((list) => { this.projectsList = list });
  }

  createForm() {
    this.crudService.currentForm = this.fb.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
      projectId: ['', Validators.required],
    })
  }

  onItemSelected($event) {
    this.crudService.currentForm.get('projectId').setValue($event);
  }

  saveLink() {
    this.crudService.save();
  }

  editLink(link) {
    this.crudService.modalTitle = "Edit Link";
    this.selectedprojectName = link.projectName || link.projectId;
    this.crudService.edit(link);
  }

  dismiss() {
    this.ngbActiveModal.close();
  }

  get title() {
    return this.crudService.currentForm.get('title');
  }

  get url() {
    return this.crudService.currentForm.get('url');
  }

  get projectId() {
    return this.crudService.currentForm.get('projectId');
  }

}
