import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PROJECT } from '@app/core/url-constant';
import { CrudService } from '@app/shared/crud.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  formFields = [
    { name: 'name' },
    { name: 'projectAlias' }
  ];

  constructor(private fb: FormBuilder, private ngbActiveModal: NgbActiveModal, public crudService: CrudService) {
    this.createForm();
  }

  ngOnInit() {
    this.crudService.initialize(this.ngbActiveModal, PROJECT, this.formFields, "Add Project");
  }

  createForm() {
    this.crudService.currentForm = this.fb.group({
      name: ['', Validators.required],
      projectAlias: ['', Validators.required]
    })
  }

  saveProject() {
    this.crudService.save();
  }

  editProject(obj) {
    this.crudService.modalTitle = "Edit Project";
    this.crudService.edit(obj);
  }

  get name() {
    return this.crudService.currentForm.get('name');
  }

  get projectAlias() {
    return this.crudService.currentForm.get('projectAlias');
  }


}
