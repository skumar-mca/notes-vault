import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbDateFRParserFormatter } from "@app/core/ngb-date-fr-parser-formatter";
import { SharedDataService } from '@app/core/shared-data.service';
import { ALLOCATION } from '@app/core/url-constant';
import { CrudService } from '@app/shared/crud.service';
import { NgbActiveModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-allocations-form',
  templateUrl: './allocations-form.component.html',
  styleUrls: ['./allocations-form.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class AllocationsFormComponent implements OnInit {
  formFields = [
    { name: 'percentage' },
    { name: 'startDate', type: 'date' },
    { name: 'endDate', type: 'date' },
    { name: 'projectId' },
    { name: 'notes' },
    { name: 'isActive' }
  ];

  model: any;

  projectsList = [];
  selectedprojectName: any;

  constructor(private fb: FormBuilder, private ngbActiveModal: NgbActiveModal, public crudService: CrudService, private sharedDataService: SharedDataService) {
    this.createForm();
  }

  ngOnInit() {
    this.crudService.initialize(this.ngbActiveModal, ALLOCATION, this.formFields, "Add Allocation");
    this.sharedDataService.projectSource.subscribe((list) => { this.projectsList = list });
  }

  onItemSelected($event) {
    this.crudService.currentForm.get('projectId').setValue($event);
  }

  createForm() {
    this.crudService.currentForm = this.fb.group({
      percentage: ['', Validators.required],
      projectId: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      notes: [''],
      isActive: [true]
    });
  }

  saveAllocation() {
    this.crudService.save();
  }

  editAllocation(obj) {
    this.crudService.modalTitle = "Edit Allocation";
    this.selectedprojectName = obj.projectName || obj.projectId;
    this.crudService.edit(obj);
  }

  onDateSelect($event, controlName) {
    return this.crudService.currentForm.get(controlName).setValue($event);
  }

  setIsActive(flag) {
    this.isActive.setValue(flag);
  }
  get percentage() {
    return this.crudService.currentForm.get('percentage');
  }

  get startDate() {
    return this.crudService.currentForm.get('startDate');
  }

  get endDate() {
    return this.crudService.currentForm.get('endDate');
  }

  get projectId() {
    return this.crudService.currentForm.get('projectId');
  }

  get notes() {
    return this.crudService.currentForm.get('notes');
  }

  get isActive() {
    return this.crudService.currentForm.get('isActive');
  }
}
