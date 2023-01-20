import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TECHNOLOGY } from '@app/core/url-constant';
import { CrudService } from '@app/shared/crud.service';

@Component({
  selector: 'app-technology-form',
  templateUrl: './technology-form.component.html',
  styleUrls: ['./technology-form.component.css']
})
export class TechnologyFormComponent implements OnInit {
  formFields = [
    { name: 'name' },
  ];
  constructor(private fb: FormBuilder, private ngbActiveModal: NgbActiveModal, public crudService: CrudService) {
    this.createForm();
  }

  ngOnInit() {
    this.crudService.initialize(this.ngbActiveModal, TECHNOLOGY, this.formFields, "Add Technology");
  }

  createForm() {
    this.crudService.currentForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  saveTechnology() {
    this.crudService.save();
  }

  editTechnology(obj) {
    this.crudService.modalTitle = "Edit Technology";
    this.crudService.edit(obj);
  }

  get name() {
    return this.crudService.currentForm.get('name');
  }
}
